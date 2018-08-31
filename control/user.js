const { db } = require('../Schema/config')
const UserSchema = require('../Schema/user')
const encrypt = require('../util/encrypt')

// 通过 db 对象创建操作user数据库的模型对象
const User = db.model("users", UserSchema)

// 用户注册
exports.reg = async ctx => {
  // 用户注册时 post 发过来的数据
  const user = ctx.request.body
  const username = user.username
  const password = user.password
  // 注册时 应该干嘛  以下操作假设 格式 符合。
  // 1、去数据库 user 先查询当前发过来的 username 是否存在
  await new Promise((resolve, reject) => {
    // 去 users 数据库查询
    User.find({username}, (err, data) => {
      if(err)return reject(err)
      // 数据库查询没出错？ 还有可能没有数据
      if(data.length !== 0){
        // 查询到数据 -->  用户名已经存在
        return resolve("")
      }
      // 用户名不存在  需要存到数据库
      // 保存到数据库之前需要先加密，encrypt模块是自定义加密模块
      const _user = new User({
        username,
        password: encrypt(password)
      })
      
      _user.save((err, data) => {
        if(err){
          reject(err)
        }else{
          resolve(data)
        }
      })
    })
  })
  .then(async data => {
    if(data){
      // 注册成功
      await ctx.render("isOk", {
        status: "注册成功"
      })
    }else{
      // 用户名已存在
      await ctx.render("isOk", {
        status: "用户名已存在"
      })
    }
  })
  .catch(async err => {
    await ctx.render('isOk', {
      status: "注册失败，请重试"
    })
  })
}

// 用户登录
exports.login = async ctx => {
  // 拿到 post 数据
  const user = ctx.request.body
  const username = user.username
  const password = user.password

  await new Promise((resolve, reject) => {
    User.find({username}, (err, data) => {
      if(err)return reject(err)
      if(data.length === 0) return reject("用户名不存在")
      
      // 把用户传过来的密码 加密后跟数据库的比对
      if(data[0].password === encrypt(password)){
        return resolve(data)
      }
      resolve("")
    })
  })
  .then(async data => {
    if(!data){
      return ctx.render('isOk', {
        status: "密码不正确，登录失败"
      })
    }

    // 让用户在他的 cookie 里设置 username password 加密后的密码 权限

    


    // 登录成功
    await ctx.render("isOk", {
      status: "登录成功"
    })
  })
  .catch(async err => {
    await ctx.render("isOk", {
      status: "登录失败"
    })
  })

}
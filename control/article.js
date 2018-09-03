const { db } = require('../Schema/config')
const ArticleSchema = require('../Schema/article')
// 去用户的 Schema，为了拿到操作 users 集合的实例对象
const UserSchema = require('../Schema/user')
const User = db.model("users", UserSchema)


// 通过 db 对象创建操作article数据库的模型对象
const Article = db.model("articles", ArticleSchema)

// 返回文章发表页
exports.addPage = async (ctx) => {
  await ctx.render("add-article", {
    title: "文章发表页",
    session: ctx.session
  })
}

// 文章的发表（保存到数据库）
exports.add = async ctx => {
  if(ctx.session.isNew){
    // true 就没登录   就不需要就查询数据库
    return ctx.body = {
      msg: "用户未登录",
      status: 0
    }
  }

  // 用户登录的情况：
  // 这是用户在登录情况下，post 发过来的数据
  const data = ctx.request.body
  // 添加文章的作者
  data.author = ctx.session.uid

  await new Promise((resolve, reject) => {
    new Article(data).save((err, data) => {
      if(err)return reject(err)
      resolve(data)
    })
  })
  .then(data => {
    ctx.body = {
      msg: "发表成功",
      status: 1
    }
  })
  .catch(err => {
    ctx.body = {
      msg: "发表失败",
      status: 0
    }
  })
}

// 获取文章列表
exports.getList = async ctx => {
  // 查询每篇文章对应的作者的头像
  // id ctx.params.id
  let page = ctx.params.id || 1
  page--
  
  const maxNum = await Article.estimatedDocumentCount((err, num) => err? console.log(err) : num)
  1 
  const artList = await Article
    .find()
    .sort('-created')
    .skip(2 * page)
    .limit(2)
    //拿到了5条数据
    .populate({
      path: "author",
      select: '_id username avatar'
    }) // mongoose 用于连表查询
    .then(data => data)
    .catch(err => console.log(err))


  await ctx.render("index", {
    session: ctx.session,
    title: "实战博客首页",
    artList,
    maxNum,
  })
  // await ctx.render("index", {})
}
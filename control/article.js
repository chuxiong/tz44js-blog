const { db } = require('../Schema/config')
const ArticleSchema = require('../Schema/article')

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
  data.author = ctx.session.username

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


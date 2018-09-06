const { db } = require('../Schema/config')

const ArticleSchema = require('../Schema/article')
const Article = db.model("articles", ArticleSchema)

// 去用户的 Schema，为了拿到操作 users 集合的实例对象
const UserSchema = require('../Schema/user')
const User = db.model("users", UserSchema)

const CommentSchema = require('../Schema/comment.js')
const Comment = db.model("comments", CommentSchema)

// 保存评论
exports.save = async ctx => {
  let message = {
    status: 0,
    msg: "登录才能发表"
  }
  // 验证用户是否登录
  if(ctx.session.isNew)return ctx.body = message

  // 用户登录了。
  const data = ctx.request.body

  data.from = ctx.session.uid

  const _comment = new Comment(data)

  await _comment
    .save()
    .then(data => {
      message = {
        status: 1,
        msg: '评论成功'
      }
      
      // 更新当前文章的评论计数器
      Article
        .update({_id: data.article}, {$inc: {commentNum: 1}}, err => {
          if(err)return console.log(err)
          console.log("评论计数器更新成功")
        })

      // 更新用户的评论计数器
      User.update({_id: data.from}, {$inc: {commentNum: 1}}, err => {
        if(err) return console.log(err)
      })
    })
    .catch(err => {
      message = {
        status: 0,
        msg: err
      }
    })
  ctx.body = message
}

// 后台： 查询用户所有评论
exports.comlist = async ctx => {
  const uid = ctx.session.uid

  const data = await Comment.find({from: uid}).populate("article", "title")


  ctx.body = {
    code: 0,
    count: data.length,
    data
  }

}

// 删除对应 id 的评论
exports.del = async ctx => {
  // 评论 id
  const commentId = ctx.params.id

  let isOk = true

  let articleId, uid;

  // 删除评论
  await Comment.findById(commentId, (err, data) => {
    if(err){
      console.log(err)
      isOk = false
      return
    }else{
      articleId = data.article
      uid = data.from
    }
  })

  await Article
    .update({_id: articleId}, {$inc: {commentNum: -1}})

  await User.update({_id: uid}, {$inc: {commentNum: -1}})

  await Comment.deleteOne({_id: commentId})

  if(isOk){
    ctx.body = {
      state: 1,
      message: "删除成功"
    }
  }
}
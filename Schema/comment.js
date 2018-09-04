const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
  // 头像   用户名  
  // 文章
  // 内容
  content: String,
  // 关联用户表
  from: {
    type: ObjectId,
    ref: "users"
  },
  // 关联到 article 表 --》 集合 
  article: {
    type: ObjectId,
    ref: "articles"
  }
}, {versionKey: false, timestamps: {
  createdAt: "created"
}})
// ObjectId("5b894bb1b0836147f985ef09")
module.exports = CommentSchema
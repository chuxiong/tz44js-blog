const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId

const ArticleSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: ObjectId,
    ref: "users"
  }, // 关联 users 的表。。。
  tips: String,
  commentNum: Number
}, {versionKey: false, timestamps: {
  createdAt: "created"
}})
// ObjectId("5b894bb1b0836147f985ef09")
module.exports = ArticleSchema
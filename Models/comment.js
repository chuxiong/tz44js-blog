const { db } = require('../Schema/config')

const CommentSchema = require('../Schema/comment')
const Comment = db.model("comments", CommentSchema)

module.exports = Comment
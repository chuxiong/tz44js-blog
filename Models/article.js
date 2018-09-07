const { db } = require('../Schema/config')

const ArticleSchema = require('../Schema/article')
const Article = db.model("articles", ArticleSchema)

module.exports = Article
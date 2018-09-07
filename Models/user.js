const { db } = require('../Schema/config')

const UserSchema = require('../Schema/user')
const User = db.model("users", UserSchema)

module.exports = User
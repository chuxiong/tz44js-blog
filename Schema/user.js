const { Schema } = require('./config')

const UserSchema = new Schema({
  username: String,
  password: String
}, {versionKey: false})


module.exports = UserSchema
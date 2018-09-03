const { Schema } = require('./config')

const UserSchema = new Schema({
  username: String,
  password: String,
  avatar: {
    type: String,
    default: "/avatar/default.jpg"
  }
}, {versionKey: false})


module.exports = UserSchema
const mongoose = require('mongoose')
const timeStamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const userSchema = new Schema({

  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.plugin(timeStamp)

module.exports = mongoose.model('User', userSchema)

var mongoose = require('mongoose')

var resetPassword = new mongoose.Schema({

  email: {
    type: String
  },

  token: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

module.exports = mongoose.model('ResetPassword', resetPassword)

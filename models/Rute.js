var mongoose = require('mongoose')

var Rute = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    required: false
  },
  deletedAt: {
    type: Date,
    required: false
  }

})

module.exports = mongoose.model('Rute', Rute)

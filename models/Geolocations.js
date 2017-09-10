var mongoose = require('mongoose')

var Geolocations = new mongoose.Schema({
  name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {type: String},

  status: {
    type: String,
    default: '1'
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

module.exports = mongoose.model('Geolocations', Geolocations)

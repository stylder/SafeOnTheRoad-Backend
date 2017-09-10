var mongoose = require('mongoose')

var LatLong = new mongoose.Schema({

  rute_id: {
    type: String,
    required: true
  },

  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('LatLong', LatLong)

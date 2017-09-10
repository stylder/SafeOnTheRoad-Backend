exports.getRute = {
  name: 'getRute',
  description: '...',
  middleware: ['logged'],

  inputs: {
    id: {
      required: true
    }
  },

  outputExample: {
    'data': {}
  },
  run: function (api, data, next) {
    api.models.Rute.findById(data.params.id).then(function (user) {
      data.response = {
        'data': user
      }
      next()
    }).catch(function (err) {
      next(err)
    })
  }
}

exports.addRute = {
  name: 'addRute',
  description: '...',
  version: 1.0,
  inputs: {
    name: {
      required: true
    }
  },
  outputExample: {
    'data': {}
  },
  run: function (api, data, next) {
    api.models.Rute.create(data.params)
      .then(function (rute) {
        data.response = {
          'data': rute
        }
        next()
      }).catch(function (err) {
        next(err)
      })
  }
}

exports.listRute = {
  name: '-',
  description: '...',
  middleware: ['logged'],
  permision: 'admin',
  version: 1.0,
  inputs: {
    id:{
      required: true
    }
  },
  outputExample: {
    'data': []
  },
  run: function (api, data, next) {
    api.models.LatLong.find({rute_id:data.params.id}).then(function ( rutes ) {
      data.response = {
        'data': rutes
      }
      next()
    }).catch(function (err) {
      next(err)
    })
  }
}

exports.updateRute = {
  name: 'updateRute',
  description: '....',
  version: 1.0,
  middleware: ['logged'],
  inputs: {
    id: {
      required: true
    },
    name: {
      required: true
    }
  },
  outputExample: {
    'data': {
      'ok': 1,
      'nModified': 0,
      'n': 1
    }
  },

  run: function (api, data, next) {
    api.models.Rute .findById(data.params.id).then(function (rute) {
      rute.update(data.params).then(function (ruteUpadated) {
        data.response = {
          'data': ruteUpadated
        }
        next()
      }).catch(function (err) {
        next(err)
      })
    }).catch(function (err) {
      next(err)
    })
  }
}

exports.deleteRute = {
  name: 'deleteRute',
  description: '...',
  middleware: ['logged'],
  version: 1.0,
  inputs: {
    id: {
      required: true
    }
  },
  outputExample: {
    'data': {}
  },
  run: function (api, data, next) {
    api.models.Rute.findByIdAndRemove(data.params.id).then(function (rute) {
      data.response = {
        'data': rute
      }

      next()
    }).catch(function (err) {
      next(err)
    })
  }
}

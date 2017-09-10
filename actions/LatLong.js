exports.getLatLong = {
  name: 'getLatLong',
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
    api.models.LatLong.findById(data.params.id).then(function (user) {
      data.response = {
        'data': user
      }

      next()
    }).catch(function (err) {
      next(err)
    })
  }
}

exports.addLatLong = {
  name: 'addLatLong',
  description: '...',
  version: 1.0,
  inputs: {
    rute_id: {
      required: true
    },
    lat: {
      required: true
    },
    long: {
      required: true
    }
  },
  outputExample: {
    'data': {}
  },
  run: function (api, data, next) {
    api.models.LatLong.create(data.params)
      .then(function (_LatLong) {
        data.response = {
          'data': _LatLong
        }
        next()
      }).catch(function (err) {
      next(err)
    })
  }
}

exports.listLatLong = {
  name: 'listLatLong',
  description: '...',
  middleware: ['logged'],
  permision: 'admin',
  version: 1.0,
  inputs: {},
  outputExample: {
    'data': []
  },
  run: function (api, data, next) {
    api.models.LatLong.find({}).then(function (latLong) {
      data.response = {
        'data': latLong
      }
      next()
    }).catch(function (err) {
      next(err)
    })
  }
}

exports.updateUser = {
  name: 'updateUser',
  description: 'Método que permite la actualización de los datos del usuario.',
  version: 1.0,
  middleware: ['logged'],
  inputs: {
    id: {
      required: true
    },
    lat: {
      required: true
    },
    long: {
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
    api.models.LatLong.findById(data.params.id).then(function (latLong) {
      latLong.update(data.params).then(function (latLongUpadated) {
        data.response = {
          'data': latLongUpadated
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

exports.deleteLatLong = {
  name: 'deleteLatLong',
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
    api.models.LatLong.findByIdAndRemove(data.params.id).then(function (latLong) {
      data.response = {
        'data': latLong
      }

      next()
    }).catch(function (err) {
      next(err)
    })
  }
}

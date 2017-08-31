var md5 = require('md5')

exports.getUser = {
  name: 'getUser',
  description: 'Método que permite obtener las características de un usuario.',
  middleware: ['logged'],

  inputs: {
    id: {
      required: true
    }
  },
  outputExample: {
    'data': {
      '_id': '599337eff7aadc304951cce5',
      'email': 'stylder@gmail.com',
      'last_name': 'García Cabral',
      'name': 'Santiago',
      'password': '81dc9bdb52d04dc20036dbd8313ed055',
      '__v': 0,
      'createdAt': '2017-08-15T18:05:35.401Z',
      'status': '1'
    }
  },

  run: function (api, data, next) {
    api.models.User.findById(data.params.id).then(function (user) {
      data.response = {
        'data': user
      }

      next()
    }).catch(function (err) {
      next(err)
    })
  }
}

exports.addUser = {
  name: 'addUser',
  description: 'Método que permite al usuario generar una cuenta en SafeOnTheRoad.',
  version: 1.0,
  inputs: {
    name: {
      required: true
    },
    last_name: {
      required: true
    },
    email: {
      required: true
    },
    password: {
      required: true
    },
    role: {
      required: false,
      default: 'user'
    }
  },
  outputExample: {
    'data': {
      '_id': '599f3fa096fb3d46762c8823',
      '__v': 0,
      'name': 'Santiago',
      'last_name': 'García Cabral',
      'email': 'stylder@gmail.com',
      'password': 'admin',
      'createdAt': '2017-08-24T21:05:36.096Z',
      'status': '1'
    }
  },
  run: function (api, data, next) {
    api.models.User.findOne({email: data.params.email}, function (err, user) {
      if (err) {
        next(err)
      }

      if (user !== null) {
        data.response.error = 'This email is already in use'
        next()
      } else {
        data.params.password = md5(data.params.password)

        api.models.User.create(data.params)
          .then(function (user) {
            user.password = ''
            data.response.user = user
            data.response = {
              'data': user
            }

            next()
            sendEmail(api, user.email, user.name + ' ' + user.last_name, function (err, data) {

            })
          }).catch(function (err) {
          next(err)
        })
      }
    })
  }
}

exports.listUser = {
  name: 'listUser',
  description: 'Método que permite obtener la lista de usuarios del sistema.',
  middleware: ['logged', 'permission'],
  permision: 'admin',
  version: 1.0,
  inputs: {},
  outputExample: {
    'data': [
      {
        '_id': '599c424391ee0f0d9358a4c3',
        'email': 'skarleth@gmail.com',
        'last_name': 'Acuña de García',
        'name': 'Skarleth',
        'password': '202cb962ac59075b964b07152d234b70',
        '__v': 0,
        'createdAt': '2017-08-22T14:40:03.803Z',
        'status': '1'
      },
      {
        '_id': '599f3fa096fb3d46762c8823',
        'name': 'Santiago',
        'last_name': 'García Cabral',
        'email': 'randy@gmail.com',
        'password': '202cb962ac59075b964b07152d234b70',
        '__v': 0,
        'createdAt': '2017-08-24T21:05:36.096Z',
        'status': '1'
      }
    ]
  },
  run: function (api, data, next) {
    api.models.User.find({}).then(function (listUsers) {
      data.response = {
        'data': listUsers
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
    name: {
      required: false
    },
    last_name: {
      required: false
    },
    email: {
      required: false
    },
    password: {
      required: false
    },
    status: {
      required: false
    },
    role: {
      required: false
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
    if (data.params.password != null) {
      data.params.password = md5(data.params.password)
    } else {
      delete data.params.password
    }

    api.models.User.findById(data.params.id).then(function (user) {
      user.update(data.params).then(function (userUpdate) {
        data.response = {
          'data': userUpdate
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

exports.deleteUser = {
  name: 'deleteUser',
  description: 'Método que permite la eliminació de un usuario del sistema.',
  middleware: ['logged'],
  version: 1.0,
  inputs: {
    id: {
      required: true
    }
  },
  outputExample: {
    'data': {
      '_id': '599c424391ee0f0d9358a4c3',
      'email': 'skarleth@gmail.com',
      'name': 'Skarleth',
      'last_name': 'Acuña de García',
      'password': '202cb962ac59075b964b07152d234b70',
      '__v': 0,
      'createdAt': '2017-08-22T14:40:03.803Z',
      'status': '1'
    }
  },
  run: function (api, data, next) {
    api.models.User.findByIdAndRemove(data.params.id).then(function (user) {
      data.response = {
        'data': user
      }

      next()
    }).catch(function (err) {
      next(err)
    })
  }
}

/**
 *
 *      Método que tiene la responsabilidad
 *      de enviar un correo una vez el usuario
 *      se a registrado en el sistema.
 *
 * @param api
 * @param email
 * @param fullName
 * @param next
 */
function sendEmail (api, email, fullName, next) {
  var user =
    [ ['link', 'https://localhost/confirm'],
      ['name', fullName]]

  var to = email
  var subject = 'Welcome To SafeOnTheRoad'

  api.email.makeEmail('welcome', user, function (err, body) {
    api.email.send(to, subject, body, function (err, email) {
      next(err)
    })
  })
}

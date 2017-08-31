var md5 = require('md5')

exports.checkLogin = {
  name: 'checkLogin',
  description: 'Método que permite conocer si se tiene una sessión iniciada en el servidor.',
  inputs: {},

  outputExample: {
    'auth': 'true',
    'session': {
      'loggedIn': true,
      'loggedInAt': '2017-08-31T03:48:22.033Z',
      'user': {
        '_id': '599bba11d42c49688e54cf27',
        'name': 'santiago',
        'last_name': 'García',
        'email': 'stylder@gmail.com',
        'password': '',
        '__v': 0,
        'createdAt': '2017-08-22T04:58:57.049Z',
        'status': '1',
      }
    }
  },

  run: function (api, data, next) {
    api.session.checkAuth(data, function (session) {
      data.response.session = session
      next()
    })
  }
}

exports.logIn = {
  name: 'logIn',
  description: 'Este método permite a un usuario registrado entrar a SafeOnTheRoad.',
  inputs: {
    email: {
      required: true
    },
    password: {
      required: true
    }
  },

  outputExample: {
    'session': {
      'loggedIn': true,
      'loggedInAt': '2017-08-31T03:47:21.726Z',
      'user': {
        '_id': '599bba11d42c49688e54cf27',
        'name': 'santiago',
        'last_name': 'García',
        'email': 'stylder@gmail.com',
        'password': '',
        '__v': 0,
        'createdAt': '2017-08-22T04:58:57.049Z',
        'status': '1'
      }
    }
  },

  run: function (api, data, next) {
    api.models.User.findOne({email: data.params.email}, function (err, user) {
      if (err) {
        data.error = err
        next(data, true)
      } else if (user == null) {
        data.response.error = 'Email not found'
        next(err)
      } else {
        var passwordHash = md5(data.params.password)

        if (passwordHash !== user.password) {
          data.response.error = 'incorrect password'
          next(err)
        } else {
          user.password = ''
          api.session.generateAtLogin(data, user, function (err, session) {

            data.response.session = session
            next(err)

          })
        }
      }
    })
  }
}

exports.logOut = {
  name: 'logOut',
  description: 'Método que permite a un usuario logeado salir del sistema.',
  inputs: {},
  middleware: ['logged'],
  outputExample: {
    'data': 'success'
  },

  run: function (api, data, next) {
    api.session.delete(data, function (err) {
      data.response.data = 'success'
      next(err)
    })
  }
}

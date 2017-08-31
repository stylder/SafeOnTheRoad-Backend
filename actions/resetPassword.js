const md5 = require('md5')
const uuidv1 = require('uuid/v1')

exports.resetPassword = {
  name: 'resetPassword',
  description: 'The secret response',
  inputs: {
    email: {
      required: true
    }
  },
  outputExample: {},

  run: function (api, data, next) {
    var resetPassword = {
      email: data.params.email,
      token: uuidv1()
    }

    api.models.ResetPassword.create(resetPassword, function (err, user) {
      sendEmailReset(api, user.email, resetPassword.token, function (err, datos) {
        data.response = {
          'data': datos
        }
        next(err)
      })
    })
  }
}

exports.newPassword = {
  name: 'newPassword',
  description: 'The secret response',
  inputs: {
    password: {
      required: true
    },
    token: {
      required: true
    }
  },
  outputExample: {},

  run: function (api, data, next) {
    var filter = {
      token: data.params.token
    }

    api.models.ResetPassword.findOne(filter, function (err, userToken) {
      if (err) {
        next(new Error('Error:' + err))
      } else {
        if (!userToken) {
          next(new Error('Invalid Token'))
        } else {
          api.models.User.findOne({email: userToken.email}, function (err, user) {
            if (err) {
              next(err)
            } else if (user === null) {
              next(new Error('User not found'))
            } else {
              var passwordHash = {
                password: md5(data.params.password)
              }

              api.models.User.update(user.id, passwordHash).then(function (user) {
                api.models.ResetPassword.findOneAndRemove({token: data.params.token}, function (err, tokenUser) {
                  data.response = {
                    'data': tokenUser
                  }
                  next(err)
                })
              }).catch(function (err) {
                next(err)
              })
            }
          })
        }
      }
    })
  }
}

exports.allTokens = {
  name: 'allTokens',
  description: 'The secret response',
  inputs: {},
  outputExample: {},

  run: function (api, data, next) {
    api.models.ResetPassword.find({}, function (err, userToken) {
      data.response = {
        'data': userToken
      }
      next(err)
    })
  }
}

function sendEmailReset (api, email, token, next) {
  var user =
        [['link', 'http://localhost/reset?token=' + token]]

  var to = email,
    subject = 'Reset SafeOnTheRoad Account'

  api.email.makeEmail('reset', user, function (err, body) {
    api.email.send(to, subject, body, function (err, email) {
      next(err)
    })
  })
}

module.exports = {

  loadPriority: 1000,
  startPriority: 1000,
  stopPriority: 1000,

  initialize: function (api, next) {
    api.session = {
      prefix: '__session:',
      duration: 180 * (60 * 1000), // 180 minutes (2 hours)

      save: function (data, session, next) {
        var key = api.session.prefix + data.id
        api.cache.save(key, session, api.session.duration, function (error) {
          if (typeof next === 'function') {
            next(error)
          }
        })
      },

      load: function (data, next) {
        var key = api.session.prefix + data.id
        api.cache.load(key, function (error, session, expireTimestamp, createdAt, readAt) {
          if (typeof next === 'function') {
            next(error, session, expireTimestamp, createdAt, readAt)
          }
        })
      },

      delete: function (data, next) {
        var key = api.session.prefix + data.id
        api.cache.destroy(key, function (error) {
          next(error)
        })
      },

      generateAtLogin: function (data, user, next) {
        var session = {
          loggedIn: true,
          loggedInAt: new Date(),
          user: user
        }
        api.session.save(data, session, function (error) {
          next(error, session)
        })
      },

      checkAuth: function (data, next) {
        api.session.load(data, function (error, session) {
          if (session === null) {
            session = {}
          }
          if (session.loggedIn !== true) {
            next(new Error('You need to be authorized for this action')) // likley to be an action's callback
          } else {
            next(session) // likley to yiled to action
          }
        })
      },

      userLoged: function (data, next) {
        api.session.load(data, function (error, session) {
          if (session) {
            next(error, session.user)
          } else {
            next(error, session)
          }
        })
      },

      middleware: {
        'logged': {
          name: 'logged',
          global: false,
          priority: 1000,
          preProcessor: function (data, next) {
            api.session.load(data, function (error, session) {
              if (session === null) {
                session = {}
              }
              if (session.loggedIn !== true) {
                data.connection.rawConnection.responseHttpCode = 401
                next(new Error('You need to be authorized for this action'))
              } else {
                next()
              }
            })
          }
        }
      }

    }
    api.actions.addMiddleware(api.session.middleware['logged'])

    next()
  },

  start: function (api, next) {
    next()
  },

  stop: function (api, next) {
    next()
  }
}

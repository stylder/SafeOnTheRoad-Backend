module.exports = {

    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,

    initialize: function (api, next) {
        api.session = {
            prefix: "__session:",
            duration: 3600 * (60 * 1000), // 1 día

            save: function (data, session, next) {
                var key = api.session.prefix + data.id;
                api.cache.save(key, session, api.session.duration, function (error) {
                    if (typeof next == "function") {
                        next(error);
                    }
                });
            },


            load: function (data, next) {
                var key = api.session.prefix + data.id;
                api.cache.load(key, function (error, session, expireTimestamp, createdAt, readAt) {
                    if (typeof next == "function") {
                        next(error, session, expireTimestamp, createdAt, readAt);
                    }
                });
            },

            delete: function (data, next) {
                var key = api.session.prefix + data.id;
                api.cache.destroy(key, function (error) {
                    next(error);
                });
            },

            generateAtLogin: function (data,user, next) {
                var session = {
                    loggedIn: true,
                    loggedInAt: new Date().getTime(),
                    user:user
                };
                api.session.save(data, session, function (error) {
                    next(error);
                });
            },

            checkAuth: function (data,  next) {
                api.session.load(data, function (error, session) {
                    if (session === null) {
                        session = {};
                    }
                    if (session.loggedIn !== true) {
                        next(new Error("You need to be authorized for this action")); // likley to be an action's callback
                    } else {
                        next(session); // likley to yiled to action
                    }
                });
            },

            userLoged: function (data,next) {
                api.session.load(data, function (error,session) {
                    if (session){
                        next(error,session.user);
                    }else{
                        next(error,session);
                    }
                });
            },


            middleware: {
                'logged': {
                    name: 'logged',
                    global: false,
                    priority: 1000,
                    preProcessor: function (data, next) {

                        api.session.load(data, function (error, session) {
                            if (session === null) {
                                session = {};
                            }
                            if (session.loggedIn !== true) {
                                next(new Error('You need to be authorized for this action'))
                            } else {
                                next();
                            }
                        });


                    }
                }
            }

        };

        api.caluculatePassowrdHash = function (password, salt) {
            return crypto.createHash('sha256').update(salt + password).digest("hex");
        };

        api.actions.addMiddleware(api.session.middleware['logged'])


        next();
    },

    start: function (api, next) {
        next();
    },

    stop: function (api, next) {
        next();
    }
};



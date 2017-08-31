var md5 = require('md5');

exports.checkLogin = {
    name: 'checkLogin',
    description: 'The secret response',
    inputs: {},

    outputExample: {
        "auth": true
    },

    run: function (api, data, next) {
        api.session.checkAuth(data, function (session) {
            data.response.data = 'success';
            data.response.session = session;
            next();
        });
    }
};


exports.logIn = {
    name: 'logIn',
    description: 'The secret response',
    inputs: {
        email: {
            required: true
        },
        password: {
            required: true
        }
    },

    outputExample: {
        "auth": true
    },

    run: function (api, data, next) {

        api.models.User.findOne({email: data.params.email}, function (err, user) {

            if (err) {
                data.error = err;
                next(data, true);
            } else if (user == null) {
                data.response.error = 'User not found';
                next(err);
            } else {

                var passwordHash = md5(data.params.password);

                if (passwordHash != user.password) {
                    data.response.error = 'incorrect password';
                    next(err);
                } else {
                    user.password = "";

                    api.session.generateAtLogin(data, user, function () {
                        data.response.auth = true;
                        data.response.user = user;
                        next(err);
                    });
                }
            }
        });
    }
};


exports.logOut = {
    name: 'logOut',
    description: 'The secret response',
    inputs: {},
    middleware: ['logged'],
    outputExample: {
        "auth": true
    },

    run: function (api, data, next) {
        api.session.delete(data, function (err) {
            data.response.data = 'success';
            next(err);
        });
    }
};


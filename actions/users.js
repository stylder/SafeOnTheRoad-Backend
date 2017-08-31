var md5 = require('md5');

exports.getUser = {
    name: 'getUser',
    description: 'Return book info from MongoDB',
    outputExample: {},
    permision: "anon",
    middleware: ['logged',"permission"],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.models.User.findById(data.params.id).then(function (user) {

            data.response = {
                "data": user,
                "permisions":{
                    "public": user.hasAccess('public'),
                    "anon": user.hasAccess('anon'), // false
                    "user": user.hasAccess('user'), // true
                    "admin": user.hasAccess('admin'), // false
                    "public_user": user.hasAccess(['public', 'user']), // true
                    "public_anon": user.hasAccess(['public', 'anon']) //
                }
            };


            next();
        }).catch(function (err) {
            next(err);
        });
    }
};

exports.addUser = {
    name: 'addUser',
    description: 'Add a User info from MongoDB',
    outputExample: {},
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
        }
    },
    version: 1.0,
    run: function (api, data, next) {


        api.models.User.findOne({email: data.params.email}, function (err, user) {

            if (err) {
                next(err);
            }

            if (user != null) {
                data.response.error = 'This email is already in use';
                next();
            } else {
                data.params.password = md5(data.params.password);

                data.params.role = 'user';
                api.models.User.create(data.params)
                    .then(function (user) {

                        user.password = "";
                        data.response.user = user;
                        data.response = {
                            "data": user
                        };

                        next();
                        sendEmail(api, user.email, user.name + " " + user.last_name, function (err, data) {

                        });
                    }).catch(function (err) {
                    next(err);
                });
            }
        });
    }
};

exports.listUser = {
    name: 'listUser',
    description: 'User list info from MongoDB',
    outputExample: {},
    inputs: {},
    middleware: ['logged'],

    version: 1.0,
    run: function (api, data, next) {


        api.models.User.find({}).then(function (book) {
            data.response = {
                "data": book
            };

            next();
        }).catch(function (err) {
            next(err);
        });

    }
};


exports.listUser = {
    name: 'listUser',
    description: 'User list info from MongoDB',
    outputExample: {},
    inputs: {},
    middleware: ['logged'],

    version: 1.0,
    run: function (api, data, next) {


        api.models.User.find({}).then(function (book) {
            data.response = {
                "data": book
            };

            next();
        }).catch(function (err) {
            next(err);
        });

    }
};


exports.updateUser = {
    name: 'updateUser',
    description: 'Book update info from MongoDB',
    outputExample: {},
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
        }
    },

    run: function (api, data, next) {

        if (data.params.password) {
            data.params.password = md5(data.params.password);
        }


        api.models.User.update(data.params.id, data.params).then(function (user) {
            data.response = {
                "data": user
            };

            next();
        }).catch(function (err) {
            next(err);
        });

    }
};


exports.deleteUser = {
    name: 'deleteUser',
    description: 'Add a User info from MongoDB',
    outputExample: {},
    middleware: ['logged'],
    inputs: {
        id: {
            required: true
        }
    },
    version: 1.0,
    run: function (api, data, next) {


        api.models.User.findByIdAndRemove(data.params.id).then(function (book) {
            data.response = {
                "data": book
            };

            next();
        }).catch(function (err) {
            next(err);
        });

    }
};


function sendEmail(api, email, full_name, next) {
    var user =
        [["link", "http://localhost/"],
            ["name", full_name]];

    var to = email,
        subject = "Welcome To SafeOnTheRoad";

    api.email.makeEmail("welcome", user, function (err, body) {
        api.email.send(to, subject, body, function (err, email) {
            next(err);
        });
    });
}
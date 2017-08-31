module.exports = {

    loadPriority: 1100,
    startPriority: 1100,
    stopPriority: 1100,

    initialize: function (api, next) {
        api.access = {

            middleware: {
                'permission': {
                    name: 'permission',
                    global: false,
                    priority: 1000,
                    preProcessor: function (data, next) {
                        var minPermision = data.actionTemplate.permision;


                        api.session.userLoged(data, function (err,user) {
                            var User = api.models.User;
                            var new_user =  new User(user);
                            if(err){
                                next(err)
                            }else{
                                if (new_user.hasAccess(minPermision)) {
                                    next();
                                } else {
                                    next(new Error("You don't have permission for this action"));
                                }
                            }
                        });
                    }
                }
            }

        };

        api.actions.addMiddleware(api.access.middleware['permission']);
        next();
    },

    start: function (api, next) {
        next();
    },

    stop: function (api, next) {
        next();
    }
};



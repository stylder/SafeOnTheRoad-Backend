var path = require('path');
var fs = require('fs-extra');
var mongoose = require('mongoose');

module.exports = {

    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,

    initialize: function (api, next) {
        api.models = {};
        api.mongo = {

            mongoose: mongoose,

            connect: function () {
                var dir = path.normalize(api.config.mongo.modelPath);

                fs.readdirSync(dir).forEach(function (file) {
                    var nameParts = file.split("/");
                    var name = nameParts[(nameParts.length - 1)].split(".")[0];
                    api.models[name] = require(dir + '/' + file);
                });

                if (api.config.mongo.startMongo) {
                    if (api.config.mongo.debug) {
                        api.mongo.mongoose.set('debug', true);
                    }
                    api.mongo.mongoose.connect(api.config.mongo.connectionURL,function(err, res) {
                        if(err) {
                            api.log('ERROR: connecting to Database. ' + err);
                        } else {

                            api.log('>>>>> Conexion Mongoose ok <<<<<', 'info');
                        }
                    });


                }
            }
        };
        next();
    },
    start: function (api, next) {
        if (api.config.mongo.enable) {
            api.mongo.connect(next);
            api.log('>>>>> Start Mongo  <<<<<', 'notice');
        }
    },
    stop: function (api, next) {
        api.mongo.mongoose.disconnect(next);
        api.log('>>>>> Stop Mongo  <<<<<', 'info');
    }
};
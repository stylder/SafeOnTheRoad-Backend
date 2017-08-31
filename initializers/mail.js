var nodemailer = require('nodemailer'),
    fs = require("fs");

module.exports = {

    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,

    initialize: function (api, next) {
        var user = api.config.email.user,
            pass = api.config.email.password,
            protocol = api.config.email.protocol,
            host = api.config.email.host,
            port = api.config.email.port;

        api.email = {

            //transporter: nodemailer.createTransport(protocol + "://" + user + ":" + pass + "@"+domain),

            transporter : nodemailer.createTransport(api.config.email),


            send: function (to, subject, body, next) {
                var payload = {
                    from: '"SafeOnTheRoad 👥" <contacto@nomada-e.com>',
                    to: to,
                    subject: subject,
                    html: body
                };
                api.email.transporter.sendMail(payload, function (error, data) {
                    next(error, data);
                });
            },

            makeEmail: function (template, keys, next) {
                fs.readFile("emails/" + template + ".html", 'utf8', function (err, template) {
                    if (err) return next(err);


                    for (var i = 0; i < keys.length; i++)
                        template = template.replace("{{" + keys[i][0] + "}}", keys[i][1]);


                    next(err, template);
                });
            }
        };

        next();
    },

    start: function (api, next) {
        api.log('>>>>> Start Mailer  <<<<<', 'notice');
        next();
    },

    stop: function (api, next) {
        next();
    }
};



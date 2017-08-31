

exports.default = {
    mongo: function(api){
        return {
            enable: true,
            startMongo: true,
            connectionURL: 'mongodb://localhost:27017/safeontheroad',
            debug: true,
            modelPath: api.projectRoot + '/models'
        };
    }
};
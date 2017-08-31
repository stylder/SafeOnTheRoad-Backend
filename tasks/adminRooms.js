/**
 * Created by Santiago García Cabral on 5/08/17.
 */
// define multiple tasks (so you can share methods)


exports.sayHello = {
    name:          'sayHello',
    description:   'I say hello',
    queue:         "default",
    plugins:       [],
    pluginOptions: [],
    frequency:     1000,
    run: function(api, params, next){
        api.log("hello");
        next();
    }
};

exports.sayGoodbye = {
    name:          'sayGoodbye',
    description:   'I say goodbye',
    queue:         "default",
    plugins:       [],
    pluginOptions: [],
    frequency:     2000,
    run: function(api, params, next){
        api.log("goodbye");
        next();
    }
};
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: 		{ type: String },
    last_name:	{ type: String },
    email:   	{ type: String },
    password:  	{ type: String },

    premium:{
        type: Boolean,
        default: false,
        required: true
    },

    status:     {
        type: String,
        default: '1'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    deletedAt: {
        type: Date,
        required: false
    }

});

userSchema.plugin(require('mongoose-role'), {
    roles: ['public', 'user', 'admin'],
    accessLevels: {
        'public': ['public', 'user', 'admin'],
        'anon': ['public'],
        'user': ['user', 'admin'],
        'admin': ['admin']
    }
});


userSchema.virtual('full_name').get(function () {
    return this.name + ' ' + this.last_name;
});



module.exports = mongoose.model('User', userSchema);


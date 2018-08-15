const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash"); 
const bcrypt = require('bcryptjs');

/*
    {
    email: 'andrew@example.com',
    password: 'abcMypass', 
        // not gonna store plain text since it's not secure, 
        // we're gonna hashing this password and using the secret
        // we take this value and covert it into a long string and store in the database
    tokens: [{
        access: 'auth',
        token: 'asdkfjapsdjfsdjlfkjasldkfjsldfjsdf'
        // when a user wants to make a secure request, 
        // user is going to send this along with their HTTP  request and 
        // we'll be able to validate that the user have access to do what they want (adding, deleting..) 
    }]
    }
*/

// 👇 The schema property lets you define a new schema we need this to track on custom methods
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// 'method' adds an instance method to documents constructed from Models
// UserSchema.methods: is an object and we can add any method you want
// To not send back token to user
UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
    const user = this;
    const access = 'auth';
    // const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    const token = jwt.sign({ _id: user._id, access }, "abc123").toString();

    user.tokens.push({ access, token });
    // user.tokens = user.tokens.concat([{ access, token }]);
    
    return user.save().then(() => {
        return token
    });
};

// 'static' adds static "class" methods to the Models itself
UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (err) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }
    // decoded = { 
    //     _id: '5b7398ee910a642b8f8360ec',
    //     access: 'auth',
    //     iat: 1534302446 
    // }

    //  Using the _id makes it faster because ids are indexed by MongoDB and 
    // you need to check for the token because it might not exist in the tokens array anymore 
    // (i.e. the user logged out and destroyed the token).
    return User.findOne({
       _id: decoded._id,
       'tokens.token': token,
       'tokens.access': 'auth' 
    // 👆 quotes are required when we have a dot in the value
    });
};

// this will run before the given event
UserSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);
/* 👆
    const User = mongoose.model("User", {
        email: {
            ...
        }
    });
*/

module.exports = { User }; 

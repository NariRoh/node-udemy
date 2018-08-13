const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash"); 

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

// To not send back token to user
UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({ access, token });
    
    return user.save().then(() => {
        return token
    });
};

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

    return User.findOne({
       '_id': decoded._id,
       'tokens.token': token,
       'tokens.access': 'auth' 
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = { User }; 

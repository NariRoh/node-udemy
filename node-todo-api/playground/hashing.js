const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash)
//     });
// });

const hashedPassword = '$2a$10$n4kTYL47PnXXIZumNHtY1uxxFZLNVFCnmjaSYvwMsgEbtF1fEFcDy';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res)
});

// const data = {
//     id: 10
// };

// const token = jwt.sign(data, '123abc');
// console.log(token);
// 👆 this is the value we send back to user when they sign up or log in 

// const decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// const message = 'I am user number 3';
// const hash = SHA256(message).toString();
// 👆 call toString() because the result is an object 

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// const data = {
//     id: 4
// };

// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// // JSON web token (JWT)
// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust!');
// }
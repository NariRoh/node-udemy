const { User } = require('./../models/user');

const authenticate = (req, res, next) => {
    const token = req.header("x-auth");

    User.findByToken(token)
      .then(user => {
        if (!user) {
          return Promise.reject();
        }
        // To send modified request object to GET /users/me 
        req.user = user;
        req.token = token;
        next();
    })
      .catch(err => {
        res.status(401).send();
      }); 
};

module.exports = { authenticate };
const admin = require("../config/firebaseConfig")
const User = require('../models/User');

const verifyToken = (req, res, next) => {
    var idToken = req.headers.authorization;
  
    if (!idToken) {
      return res.status(401).json({
        message: 'Unauthorized',
        error: true
      });
    }
    idToken = idToken.split(' ')[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        // if (!decodedToken.email_verified) {
        //   return res.status(401).json({
        //     message: 'Email not verified',
        //     error: true
        //   });
        // }
        User.findOne({
            where: {
              user_id: decodedToken.uid
            }
          })
          .then((user) => {
            if (!user) {
              return res.status(401).json({
                message: 'Unauthorized'
              });
            }
            req.userInfo = user
            next();
          })
  
  
  
      })
      .catch((error) => {
        console.error('Error verifying token:', error);
        return res.status(401).json({
          message: 'Unauthorized',
          errorInfo: error,
          error: true
        });
      });
  };

  module.exports = verifyToken;
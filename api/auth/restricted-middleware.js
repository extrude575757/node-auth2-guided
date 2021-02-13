const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets.js')

module.exports = (req, res, next) => {
  const tkn = req.headers?.authorization?.split(" ")[1];
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json('we wantz VALID token')
      } else {
        console.log(req);
        req.decodedJwt = decodeds;
        next()
      }
    })
  } else {
    res.status(401).json('we wantz token')
  }
};

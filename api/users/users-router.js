const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const restrictRole = require('../auth/rolerestricted-middleware.js')

router.get("/", restricted, restrictRole('admin'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// Now there is limited accessablity for user 
router.get('/limited', restricted, restrictRole('user'), (req,res) =>{
  const decodedtkn = req?.decodedJwt?.username; 
    Users.findBy({username:decodedtkn})
      .then((users) => {
        console.log('limitedf  here',decodedtkn)
        res.json(users)
      })
      .catch( er => {
        res.status(500).json({messger:er, tkn:decodedtkn})
      });
})
module.exports = router;

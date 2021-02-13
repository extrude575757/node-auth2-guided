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
router.get('/limited', restricted, checkRole('user'), (req,res) =>{
    Users.findBy({username: req?.decodedJWT?.username})
      .then((users) => {
        res.json(users)
      })
      .catch( er => res.send(er));
})
module.exports = router;

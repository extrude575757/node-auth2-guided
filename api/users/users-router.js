const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const restrictRole = require('../auth/rolerestricted-middleware.js')


// Shows all users for only the admins session token
router.get("/", restricted, restrictRole('admin'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// Only see currently logged in user with the session token
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

// Only shows other users when you are a user 
router.get('/userlimited', restricted, restrictRole('user'), (req,res) =>{
  const decodedtkn = req?.decodedJwt?.role; 
    Users.findByRole({username:decodedtkn})
      .then((users) => {
        console.log('limitedf  here',decodedtkn)
        res.json(users)
      })
      .catch( er => {
        res.status(500).json({messger:er, tkn:decodedtkn})
      });
})

// Only shows other admins when you are a admin
router.get('/adminlimited', restricted, restrictRole('admin'), (req,res) =>{
  const decodedtkn = req?.decodedJwt?.role; 
    Users.findByRole({username:decodedtkn})
      .then((users) => {
        console.log('limitedf  here',decodedtkn)
        res.json(users)
      })
      .catch( er => {
        res.status(500).json({messger:er, tkn:decodedtkn})
      });
})
module.exports = router;

module.exports = role => (req, res, next) => {

  // if((req?.decodedJwt?.role  || "") === role){
  //   next();
  // }else{
  //   res.status(403).json({you: "fhd"})
  // }
  if (req.decodedJwt && req.decodedJwt.role === role) {
    next()
  } else {
    res.status(403).json('you have no power here')
  }
}

const allowedorigins = require('../config/allowedOrigins')

const credentials  = (req, res, next) =>{
  const origin = req.headers.origin;
  if (allowedorigins.includes(origin)){
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
}

module.exports = credentials;
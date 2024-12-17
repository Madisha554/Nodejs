const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401) // no authorization

    console.log(authHeader); // the output like Bearer token...
    const token = authHeader.split(' ')[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) =>{
        if(err) return res.sendStatus(403) // forbidden
        req.user = decoded.userInfo.username;
        req.roles = decoded.userInfo.roles;
        next(); // proceed to the next middleware or route handler
      }
    )
}


module.exports = verifyJWT
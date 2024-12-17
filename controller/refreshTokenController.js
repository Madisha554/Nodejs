const usersDB ={
  users: require('../model/users.json'),
  setUsers: function (data) {this.users = data},
}

const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');
const fsPromises = require('fs').promises;

const handleRefresh = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(401);

  const refreshToken = cookies.jwt;
  const userRecord = usersDB.users.find(u => u.refreshToken===refreshToken);
  if (!userRecord) return res.status(403)// Unauthenticated

  jwt.verify(
    refreshToken, 
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || userRecord.username !== decoded.username) return res.status(403);
      const roles = Object.values(userRecord.roles)
      const accessToken = jwt.sign(
        {"userInfo":{
          "username": decoded.username,
          "roles": roles,
        }
      },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      )
      res.json({accessToken}); // sending for frontend developer
    }

  )
}
    // Create JWTs

  


module.exports = { handleRefresh }
const usersDB ={
  users: require('../model/users.json'),
  setUsers: function (data) {this.users = data},
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;

const handleLogin = async (req, res) =>{
  const {user, password} = req.body
  if (!user || !password) return res.status(401).json({ message: ' username and password are required' });
  const userRecord = usersDB.users.find(u => u.username === user);
  if (!userRecord) return res.status(401)// Unauthenticated
  const match = await bcrypt.compare(password, userRecord.password);
  if(match){

    // Create JWTs

    const accessToken = jwt.sign(
      { username: userRecord.username }, 
      process.env.ACCESS_TOKEN_SECRET, 
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { username: userRecord.username }, 
      process.env.REFRESH_TOKEN_SECRET, 
      { expiresIn: '1d' }
    );

    //saving refresh token with current user
    const otherUsers = usersDB.users.filter(person => person.username !== userRecord.username); 
    const currentUser = {...userRecord, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..','model', 'users.json'), JSON.stringify(usersDB.users)
    );
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 60 * 60 * 24 *1000});
    res.json({accessToken});
  }
  else{
    res.status(401)
  }

} 

module.exports = { handleLogin }
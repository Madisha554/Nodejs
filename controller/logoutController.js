const User = require('../model/User')


const handleLogout = async (req, res) => {
  // On client, also delete the access token
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204);// No content
  const refreshToken = cookies.jwt;

  // Is refresh token in db?
  const userRecord = await User.findOne({refreshToken}).exec();
  if (!userRecord){
    res.clearCookie('jwt', {httpOnly: true})
    return res.sendStatus(204)// No content
  }

  // Remove refresh token from user record
  // const otherUsers = User.filter(person => person.refreshToken!== userRecord.refreshToken);
  // const currentUser = {...userRecord, refreshToken: ''};
  // usersDB.setUsers([...otherUsers, currentUser]);

  // await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDB.users))

  userRecord.refreshToken = '';
  const result = await userRecord.save();
  console.log(result)
  
  res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'}) // Also we can use secure: true - only serves on https and we have to add this in the production but is not mandatorry in the development
  res.sendStatus(204)// No content

}

  


module.exports = { handleLogout }
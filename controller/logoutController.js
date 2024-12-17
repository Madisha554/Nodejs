const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data },
}

const path = require('path');
const fsPromises = require('fs').promises;

const handleLogout = async (req, res) => {
  // On client, also delete the access token
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204);// No content
  const refreshToken = cookies.jwt;

  // Is refresh token in db?
  const userRecord = usersDB.users.find(u => u.refreshToken===refreshToken);
  if (!userRecord){
    res.clearCookie('jwt', {httpOnly: true})

    return res.sendStatus(204)// No content
  }

  // Remove refresh token from user record
  const otherUsers = usersDB.users.filter(person => person.refreshToken!== userRecord.refreshToken);
  const currentUser = {...userRecord, refreshToken: ''};
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDB.users))

  res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'}) // Also we can use secure: true - only serves on https and we have to add this in the production but is not mandatorry in the development
  res.sendStatus(204)// No content

}

  


module.exports = { handleLogout }
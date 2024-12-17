const usersDB ={
  users: require('../model/users.json'),
  setUsers: function (data) {this.users = data},
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) =>{
  const  { user, password } = req.body;
  if (!user || !password) return res.status(400).json({'message': ' username and password are required'});

  // check if the user already exists in the database
  const existingUser = usersDB.users.find(u => u.user === user);
  if (existingUser) return res.status(409).json({'message': 'User already exists'});
  try{
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create a new user object with the hashed password
    const newUser = {
      "username": user,
      "roles":{"user":2001}, 
      "password": hashedPassword
    }; 
    usersDB.setUsers([...usersDB.users, newUser]);
    // save the updated usersDB to JSON file
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
    res.status(201).json({'Success': `New User ${user} created successfully`});

  }catch(err){
    res.status(500).json({'message': err.message});
  }
}

module.exports = { handleNewUser } 
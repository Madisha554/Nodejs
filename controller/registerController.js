const User = require('../model/User')
const bcrypt = require('bcrypt');

const handleNewUser =async (req, res) =>{
  const  { user, password } = req.body;
  if (!user || !password) return res.status(400).json({'message': ' username and password are required'});

  // check if the user already exists in the database
  const existingUser = await User.findOne({username: user}).exec();
  if (existingUser) return res.status(409).json({'message': 'User already exists'});
  try{
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user object with the hashed password
    const result = await User.create({
      "username": user,
      "password": hashedPassword
    }); 
    console.log(result)
    res.status(201).json({'message': 'User created successfully'});

    }catch(err){
      res.status(500).json({'message': err.message});
    }
}

module.exports = { handleNewUser } 
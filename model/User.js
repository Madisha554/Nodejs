const mongoose =require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 8
    // select: false
  },
  roles: {
    User:{
      type: Number,
      default: 2001
    },
    Editor:Number,
    Admin:Number
  },
  refreshToken: String

})
module.exports = mongoose.model('User', userSchema)
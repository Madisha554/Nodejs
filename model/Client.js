const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  dept:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Client', employeeSchema);



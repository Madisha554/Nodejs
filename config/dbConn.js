const mongoose = require('mongoose');

const connectDB = async () =>{
  try{
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      // serverSelectionTimeoutMS: 20000
      // connectTimeoutMS: 20000,
    })
  }catch(e){
    console.log(e)
  }
}

module.exports = connectDB;
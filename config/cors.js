const allowedorigin = require('./allowedorigin')

const corsOptions = {
  origin: (origin, callback) =>{
    if (allowedorigin.includes(origin) || !origin) { 
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 
};

module.exports = corsOptions;
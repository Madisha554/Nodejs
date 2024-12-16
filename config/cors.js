const allowedorigins = require('./allowedOrigins.js')

const corsOptions = {
  origin: (origin, callback) =>{
    if (allowedorigins.includes(origin) || !origin) { 
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 
};

module.exports = corsOptions;
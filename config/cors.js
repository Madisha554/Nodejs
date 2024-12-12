const whiteList = ['https://www.google.com', 'https://www.youtube.com', 'https://madisha554.github.io', 'http://localhost:3500']; 

const corsOptions = {
  origin: (origin, callback) =>{
    if (whiteList.includes(origin) || !origin) { 
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 
};

module.exports = corsOptions;
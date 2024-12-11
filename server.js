const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents')
const  errorHandler  = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;
// custom Middle ware logger

app.use(logger)
// cross origin resource sharing

const whiteList = ['https://www.mywebsite.com', 'http://localhost:3500']; 

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
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Static file serving`
app.use(express.static(path.join(__dirname, '/public')))
app.use('/subclient', express.static(path.join(__dirname, '/public')))

app.use(require('./routes/root'))
app.use('/subclient', require('./routes/subdir'))
app.use('/client', require('./routes/api/client'));

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'client', '404.html'));
    }else if (req.accepts('json')) {
        res.sendFile({error: '404 Not  Found'});
    } else {
        res.type('txt').sendFile('404 Not Found');
    }
})

app.use(errorHandler)

app.listen(PORT);
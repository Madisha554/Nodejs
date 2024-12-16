const express = require('express');
const app = express();
const path = require('path');
const credentials = require('./middleware/credential.js');
const cors = require('cors');
const corsOptions = require('./config/cors.js');
const { logger } = require('./middleware/logEvents')
const  errorHandler  = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3500;
// custom Middle ware logger

app.use(logger)

app.use(credentials);

// cross origin resource sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// Static file serving`
app.use(express.static(path.join(__dirname, '/public')))

//routes to root.js
app.use(require('./routes/root'))

//routes to client.js 
app.use('/register', require('./routes/register'));

app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));


app.use(verifyJWT);
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
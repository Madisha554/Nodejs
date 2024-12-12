const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/cors.js');
const { logger } = require('./middleware/logEvents')
const  errorHandler  = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;
// custom Middle ware logger

app.use(logger)
// cross origin resource sharing


app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Static file serving`
app.use(express.static(path.join(__dirname, '/public')))
app.use(require('./routes/root'))
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
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;


app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
}) 
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'new-page.html'));
}) 
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //default redirect
})



const one = (req, res, next) => {
    console.log('First middleware');
    next();
};

const two = (req, res, next) => {
    console.log('Second middleware');
    next();
};

const three = (req, res) => {
    console.log('Third middleware');
    res.send('Hello from middleware three');
};

// Route setup
app.get('/chain(.html)?', [one, two, three]);

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'client', '404.html'));
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
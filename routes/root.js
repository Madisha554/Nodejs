const express = require('express');
const router = express.Router();
const path = require('path'); 

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
}) 
router.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'new-page.html'));
}) 


router.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page.html'); //default redirect
})

module.exports = router;
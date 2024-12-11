const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'subClient', 'index.html'));
})
router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'subClient', 'test.html'));
})

module.exports = router
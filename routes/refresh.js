const express = require('express')
const router = express.Router()

const refreshController = require('../controller/refreshTokenController')

router.get('/', refreshController.handleRefresh)

module.exports = router
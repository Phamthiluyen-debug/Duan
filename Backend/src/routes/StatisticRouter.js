const express = require('express')
const router = express.Router()

const StatisticController = require('../controllers/StatisticController')

router.get('/revenue', StatisticController.getRevenue)

module.exports = router
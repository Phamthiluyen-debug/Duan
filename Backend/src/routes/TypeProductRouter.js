const express = require('express')
const router = express.Router()

const TypeProductController = require('../controllers/TypeProductController')

router.post('/create', TypeProductController.createType)

router.get('/get-all', TypeProductController.getAllType)

router.delete('/delete/:id', TypeProductController.deleteType)

router.put('/update/:id', TypeProductController.updateType)

module.exports = router
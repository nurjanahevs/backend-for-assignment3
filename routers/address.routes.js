const express = require('express')
const addressData = express.Router()
const authentication = require('../middlewares/authentication')
const addressController = require('../controllers/addressController')

addressData.post('/address',authentication,addressController.createAdress)
addressData.get('/address',authentication,addressController.getAdress)
addressData.put('/address/update',authentication,addressController.updateAdress)
addressData.delete('/address',authentication,addressController.deleteAddress)

module.exports = addressData
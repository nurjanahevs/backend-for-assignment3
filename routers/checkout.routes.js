const express = require('express')
const dataCheckout = express.Router()
const authentication = require('../middlewares/authentication')
const checkoutController = require('../controllers/checkoutController')

dataCheckout.post('/checkout',authentication,checkoutController.userCheckout)
dataCheckout.get('/checkout/list',authentication,checkoutController.listCheckout)
dataCheckout.get('/checkout/:checkoutID',authentication,checkoutController.getCheckout)
dataCheckout.delete('/checkout/:checkoutID',authentication,checkoutController.deleteCheckout)

module.exports = dataCheckout
const express = require('express')
const orderData = express.Router()
const userAuth = require('../middlewares/authentication')
const orderController = require('../controllers/orderController')

orderData.post('/order/',userAuth,orderController.newOrder)
orderData.get('/order/list',userAuth,orderController.listOrder)
orderData.get('/order/:orderID',userAuth,orderController.getOrder)
orderData.get('/order/add/:productID',userAuth,orderController.addOneQuantity)
orderData.delete('/order/delete/:productID',userAuth,orderController.deleteOneQuantity)
orderData.delete('/order/:orderID',userAuth,orderController.deleteOrder)

module.exports = orderData
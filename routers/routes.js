const express = require('express');
const approute = express.Router()
const userRoutes = require('./user.routes')
const productRoutes = require('./product.routes')
const orderRoutes = require('./order.routes')
const addressRoutes = require('./address.routes')
const checkoutRoutes = require('./checkout.routes')

const errorHandlers = require('../helpers/errorHandlers')

approute.use('/user', userRoutes)
approute.use('/admin',productRoutes)
approute.use('/user',orderRoutes)
approute.use('/user',addressRoutes)
approute.use('/user',checkoutRoutes)
approute.use(errorHandlers)

module.exports = approute
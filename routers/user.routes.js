const express = require('express')
const dataUser = express.Router()
const authentication = require('../middlewares/authentication')
const userController = require('../controllers/userController')

dataUser.post('/signup',userController.register)
dataUser.post('/signin',userController.login)
dataUser.get('/',authentication,userController.getUser)
dataUser.put('/update',authentication,userController.updateUser)

module.exports = dataUser
'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

//RUTAS API (GET, POST, PUT, DELETE)
api.get('/product', auth, productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', auth, productCtrl.saveProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)



// RUTAS PARA USERS
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/users', userCtrl.getUsers)
api.get('/users/:userId', userCtrl.getUser)
api.post('/users', userCtrl.saveUser)
api.delete('/users/:userId', userCtrl.deleteUser)


module.exports = api
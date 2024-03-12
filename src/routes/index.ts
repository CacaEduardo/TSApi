const routes = require('express').Router()
const {UserController} = require('../controllers')

routes.post('/user', UserController.create)
routes.post('/doLogin', UserController.doLogin)

export default routes
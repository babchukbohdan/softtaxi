const Router = require('express')

const router = new Router()

const userController = require('../controller/UserController')

router.post('/user', userController.create)
router.get('/user', userController.get)
router.get('/user/:id', userController.getOne)
router.put('/user', userController.update)
router.delete('/user/:id', userController.delete)

module.exports = router

const RequestsController = require('../controller/RequestsController')
const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/', RequestsController.create)
// router.get('/', authMiddleware, RequestsController.get)
router.get('/', RequestsController.get)
router.get('/:id', RequestsController.getOne)
router.put('/', RequestsController.update)

module.exports = router

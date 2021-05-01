const Router = require('express')

const router = new Router()

const RequestsController = require('../controller/RequestsController')

router.post('/requests', RequestsController.createRequest)
router.get('/requests', RequestsController.getRequests)
router.put('/requests', RequestsController.updateRequest)

module.exports = router

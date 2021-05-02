const Router = require('express')

const router = new Router()

const DriverController = require('../controller/DriverController')

router.post('/drivers', DriverController.createDriver)
router.get('/drivers', DriverController.getDrivers)
router.put('/drivers', DriverController.updateDriver)

module.exports = router

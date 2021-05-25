/* eslint-disable */
const Router = require('express')

import RequestsController from '../controller/RequestsController'
import authMiddleware from '../middleware/authMiddleware'

const router = new Router()

router.post('/', RequestsController.create)
router.get('/', RequestsController.get)
router.get('/:id', RequestsController.getOne)
router.put('/', RequestsController.update)

export default router

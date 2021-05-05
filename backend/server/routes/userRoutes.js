const createRouter = require('./CreateRouter')
const UserController = require('../controller/UserController')

const router = createRouter(UserController)
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
module.exports = router

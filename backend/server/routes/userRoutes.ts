import createRouter from './CreateRouter'
import UserController from '../controller/UserController'

const router = createRouter(UserController)
router.post('/registration/driver', UserController.registrationDriver)
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
export default router

const createRouter = require('./CreateRouter')
const UserController = require('../controller/UserController')


module.exports = createRouter(UserController)

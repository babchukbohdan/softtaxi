const createRouter = require('./CreateRouter')
const RequestsController = require('../controller/RequestsController')
// const authMiddleware = require('../middleware/authMiddleware')

module.exports = createRouter(RequestsController)

const Router = require('express')
function createRouter(controller) {
  const router = new Router()

  router.post('/', controller.create)
  router.get('/', controller.get)
  router.get('/:id', controller.getOne)
  router.put('/', controller.update)
  router.delete('/:id', controller.delete)

  return router
}
module.exports = createRouter
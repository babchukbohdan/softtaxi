const Router = require('express')

export default function createRouter(controller: any) {
  const router = new Router()

  router.post('/', controller.create)
  router.get('/', controller.get)
  router.get('/:id', controller.getOne)
  router.put('/', controller.update)
  router.delete('/:id', controller.delete)

  return router
}

import express from 'express'

import ClassController from './controllers/ClassController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = express.Router()

const classController = new ClassController()
const connectionsController = new ConnectionsController()

routes.post('/classes', classController.store)
routes.get('/classes', classController.index)

routes.post('/connections', connectionsController.store)
routes.get('/connections', connectionsController.index)

export default routes
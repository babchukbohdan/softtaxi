import express, { Application } from 'express'
import cors from 'cors'
import { logger } from './utils/logger'

require('dotenv').config()

import userRouter from './routes/userRoutes'
import requestsRouter from './routes/requestsRoutes'
import driverRouter from './routes/driverRoutes'

const SERVER_PORT = process.env.SERVER_PORT || 8080
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use('/requests', requestsRouter)
app.use('/driver', driverRouter)

app.listen(SERVER_PORT, () =>
  logger.log('info', `server started on port ${SERVER_PORT}`)
)

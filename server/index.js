const express = require('express')
require('dotenv').config()

const userRouter = require('./routes/userRoutes')
const requestsRouter = require('./routes/requestsRoutes')
const driverRouter = require('./routes/driverRoutes')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use('/user', userRouter)
app.use('/requests', requestsRouter)
app.use('/driver', driverRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

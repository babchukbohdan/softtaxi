const express = require('express')
const userRouter = require('./routes/userRoutes')
const requestsRouter = require('./routes/requestsRoutes')
const driverRouter = require('./routes/driverRoutes')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', requestsRouter)
app.use('/api', driverRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

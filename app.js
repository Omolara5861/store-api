require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const errorMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

const productRouter = require('./routes/products')

const connectDB = require('./db/connect')

// Application Root
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1> <a href="api/v1/products">Products Route</a>')
})

// Product Routes
app.use('/api/v1/products', productRouter)

// Middlewares
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT = process.env.PORT || 4002
const startServer = async () => {
  try {
    // Connect to Database
    await connectDB(process.env.MONGODB_URI)
    app.listen(PORT, console.log(`Server is listening on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}
startServer()

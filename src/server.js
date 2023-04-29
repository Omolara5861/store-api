const connectDB = require('./db/connect')
const app = require('./app')
require('dotenv').config()

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
module.exports = startServer

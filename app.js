require('dotenv').config();
const express = require('express');
const errorMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

const app = express();

//Application Root
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1> <a href="api/v1/products">Products Route</a>');
});


//Middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);


const PORT = process.env.PORT || 4002;
const startServer = async () => {
    try {
        app.listen(PORT, console.log(`Server is listening on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}
startServer();
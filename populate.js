require('dotenv').config();

const connectDB = require('./db/connect');
const product = require('./models/product');
const products = require('./products');


const populateProducts = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        await product.deleteMany();
        await product.create(products);
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exist(1);
    }
}
populateProducts();
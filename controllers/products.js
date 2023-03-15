const product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    // throw new Error('Custom errorCustom error');
    const products = await product.find({});
    res.status(200).json({msg: 'Products Fetched Successfully', nbHits: products.length, products});
}

const getAllProducts = async (req, res) => {
    const queryObj = {};
    const {featured, company} = req.query;
    if(featured) {
        queryObj.featured = featured === 'true' ? true : false;
    }
    if(company) {
        queryObj.company = company;
    }
    const products = await product.find(queryObj);
    res.status(200).json({msg: 'Products Fetched Successfully', products, nbHits: products.length});
}

module.exports = {getAllProducts, getAllProductsStatic};
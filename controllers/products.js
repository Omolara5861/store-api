const product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    // throw new Error('Custom errorCustom error');
    const products = await product.find({});
    res.status(200).json({msg: 'Products Fetched Successfully', nbHits: products.length, products});
}

const getAllProducts = async (req, res) => {
    const queryObj = {};
    const {featured, company, name, sort, fields} = req.query;
    if(featured) {
        queryObj.featured = featured === 'true' ? true : false;
    }
    if(company) {
        queryObj.company = company;
    }
    if(name) {
        queryObj.name = {$regex: name, $options: 'i'}
    }
    let result = product.find(queryObj);
    if(sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt');
    }
    if(fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }
    const products = await result;
    res.status(200).json({msg: 'Products Fetched Successfully', products, nbHits: products.length});
}

module.exports = {getAllProducts, getAllProductsStatic};
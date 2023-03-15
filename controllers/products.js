const product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    // throw new Error('Custom errorCustom error');
    const products = await product.find({});
    res.status(200).json({msg: 'Products Fetched Successfully', nbHits: products.length, products});
}

const getAllProducts = async (req, res) => {
    const queryObj = {};
    const {featured, company, name, sort, fields, numericFilters} = req.query;
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

    if(numericFilters) {
    const operatorsMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte'
    }
    const regEx = /\b(> | >= | = | < | <=)\b/g;
    let filters = numericFilters.replace(regEx, match = `-${operatorsMap[match]}-`);
    console.log(filters);
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach(item => {
        let [field, operator, value] = item.split('-');
        if(options.includes(field)) {
            queryObj[field] = {[operator]: Number(value)};
        }
    })
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({msg: 'Products Fetched Successfully', products, nbHits: products.length});
}

module.exports = {getAllProducts, getAllProductsStatic};
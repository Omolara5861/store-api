/** The module imports the Mongoose model product that contains the schema and model definitions for products. */
const product = require("../models/product");

/** This function fetches all the products from the database and sends the response back to the client with a success status code and message, number of hits (number of products retured) and the list of products. */
const getAllProductsStatic = async (req, res) => {
    // throw new Error('Custom errorCustom error');
    const products = await product.find({ price: { $gt: 30 } });
    res.status(200).json({
        msg: "Products Fetched Successfully",
        nbHits: products.length,
        products,
    });
};

/** This function first extracts query parameters from the request object and assigns them to variables. It then constructs a query object using the query parameters used for filtering */
const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObj = {};

    /** If featured is provided as a query parameter, it is converted to a boolean and added to the query object. If company is provided, it is added to the query object as it is. If name is provided, it is used to construct a regular expression with the case-insensitive flag and added to the query object. */
    if (featured) {
        queryObj.featured = featured === "true" ? true : false;
    }
    if (company) {
        queryObj.company = company;
    }
    if (name) {
        queryObj.name = { $regex: name, $options: "i" };
    }

    let result = product.find(queryObj);

    /** If sort is provided, the result variable is updated to sort the products according to the provided sort criteria. Otherwise, the default sort criteria is applied (i.e., by creation date). */
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("createdAt");
    }

    /** If fields is provided, the result variable is updated to select and return only the specified fields from the products. */
    if (fields) {
        const fieldList = fields.split(",").join(" ");
        result = result.select(fieldList);
    }

    /** If numericFilters is provided, it is parsed to extract the field, operator, and value using regular expressions, and converted to a MongoDB query object. The query object is then merged with the existing query object. */
    if (numericFilters) {
        const operatorsMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorsMap[match]}-`
        );
        const options = ["price", "rating"];
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
                queryObj[field] = { [operator]: Number(value) };
            }
        });
    }

    /** The page and limit parameters are extracted from the request object to set up pagination. The result variable is updated to skip the appropriate number of records and limit the results to the specified number of records per page. */
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    /** The query is executed and the response is sent back to the client with a success message and status code, number of hits and the list of products that match the query criteria. */
    const products = await result;
    res.status(200).json({
        msg: "Products Fetched Successfully",
        nbHits: products.length,
        products
    });
};

module.exports = { getAllProducts, getAllProductsStatic };

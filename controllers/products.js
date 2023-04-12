/** The module imports the Mongoose model product that contains the schema and model definitions for products. */
const Product = require('../models/product')

/** This function fetches all the products from the database and sends the response back to the client with a success status code and message, number of hits (number of products returned) and the list of products. */
const getAllProductsStatic = async (req, res) => {
  // throw new Error('Custom errorCustom error');
  const products = await Product.find({})
  res.status(200).json({
    msg: 'Products Fetched Successfully',
    // using totalRecords or recordCount is more understandable than nbHits
    totalRecords: products.length,
    data: products
  })
}

/** This function first extracts query parameters from the request object and assigns them to variables. It then constructs a query object using the query parameters used for filtering */
const getAllProducts = async (req, res) => {
  try {
    const { featured, company, name, sort = 'createdAt', fields, numericFilters } = req.query
    const queryObj = {}

    /** If featured is provided as a query parameter, it is converted to a boolean and added to the query object. If company is provided, it is added to the query object as it is. If name is provided, it is used to construct a regular expression with the case-insensitive flag and added to the query object. */
    if (featured) {
      queryObj.featured = featured === 'true'
    }
    if (company) {
      queryObj.company = company
    }
    if (name) {
      queryObj.name = { $regex: name, $options: 'i' }
    }
    /** If numericFilters is provided, it is parsed to extract the field, operator, and value using regular expressions, and converted to a MongoDB query object. The query object is then merged with the existing query object. */
    if (numericFilters) {
      const operatorsMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte'
      }

      const regEx = /\b(<|>|>=|=|<|<=)\b/g
      const filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorsMap[match]}-`
      )

      const options = ['price', 'rating']
      filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-')
        if (options.includes(field)) {
          queryObj[field] = { [operator]: Number(value) }
        }
      })
    }

    let result = Product.find(queryObj)

    /** If sort is provided, the result variable is updated to sort the products according to the provided sort criteria. Otherwise, the default sort criteria is applied (i.e., by creation date). */
    if (sort) {
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
    }

    // else {
    // result = result.sort('createdAt')
    // }

    /** If fields is provided, the result variable is updated to select and return only the specified fields from the products. */
    if (fields) {
      const fieldList = fields.split(',').join(' ')
      result = result.select(fieldList)
    }

    /** The page and limit parameters are extracted from the request object to set up pagination. The result variable is updated to skip the appropriate number of records and limit the results to the specified number of records per page. */
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({
      msg: 'Products Fetched Successfully',
      totalRecords: products.length,

      data: products
    })
  } catch (err) {
    res.status(500).json({
      msg: 'Something went wrong, couldn\'t fetch products '
    })
  }
}

/** This method retrieves a product from the database based on its id */
const getProduct = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findById({ _id: id })

    if (!product) {
      return res.status(404).json({ msg: `No product with the provided id '${id}'` })
    }

    return res.status(200).json({ msg: 'Product fetched successfully', data: product })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Something went wrong, couldn\'t fetch product' })
  }
}

/** Export methods so it can be accessible outside this file */
module.exports = { getAllProducts, getAllProductsStatic, getProduct }

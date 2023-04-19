const createError = require('http-errors')

const notFound = (req, res, next) => { next(createError(404, 'Route does not exist')) }

module.exports = notFound

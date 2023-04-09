const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err)

  if (err?.status) {
        return res.status(err.status).json({statusCode:err?.status,
            msg:err?.message,stack:process.env.NODE_ENV !=='production' ? err?.stack:{}
        })
    }

  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware

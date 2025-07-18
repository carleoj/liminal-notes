const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal server error.'
    })
}

module.exports = errorHandler
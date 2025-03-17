const errorHandling = (error, req, res, next) => {
    return res.status(500).send({
        status: 500,
        message:"Something went wrong",
        error: error.message,
    })
}

module.exports = errorHandling;
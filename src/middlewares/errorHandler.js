const AppError = require("../exceptions/appError");
const ValidationError = require("../exceptions/validationError");

function errorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        // Handle custom ValidationError
        res.status(err.statusCode).json(err.toJSON());
        return;
    }

    // Handle general errors
    const error = new AppError('Internal Server Error', { exception: err.message }, 500);
    res.status(500).json(error);
}

module.exports = errorHandler;

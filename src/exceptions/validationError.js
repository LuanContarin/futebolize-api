const AppError = require("./appError");

class ValidationError extends AppError {
    constructor(message, details = null) {
        super(message, details, 400);
    }
}

module.exports = ValidationError;

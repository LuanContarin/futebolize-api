class AppError extends Error {
    constructor(message, details = null, statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.details = details;
        this.statusCode = statusCode;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            ...(this.details && { details: this.details })
        };
    }
}

module.exports = AppError;

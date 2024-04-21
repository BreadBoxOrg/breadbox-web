/*
    * File: appError.js
    * Description: 
        * This file is responsible for handling errors in the application.
        * It creates an error class that extends the Error class.
        * The error class is used to create custom error messages and send status codes.
*/
class AppError extends Error { //error handling class

    constructor(message, statusCode, success = false) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.success = success;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
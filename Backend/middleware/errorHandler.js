/*
  * File: errorHandler.js

  * Description: 
    * This file is the middleware responsible for handling errors in the application.
    * The error handling middleware sends the status code and error message to the client.
    * The error handling middleware is used in the server.js file.
*/
module.exports = (err, req, res, next) =>  { //error handling middleware

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    const success = err.success || false;

    res.status(err.statusCode).json({
        success: success,
        status: err.status,
        message: err.message
    });
};
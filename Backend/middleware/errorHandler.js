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
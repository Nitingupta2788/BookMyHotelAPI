export const createError = (status, message) => {
    const error = new Error();
    error.status = status
    error.message = message
    return error
}

export const errorHandler = ((err, req, res, next) => {
    const errorStatus = err.status || '500'
    const errorMessage = err.message || 'Something went wrong, please check your logs'
    const errorStack = err.stack

    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: errorStack

    })
})
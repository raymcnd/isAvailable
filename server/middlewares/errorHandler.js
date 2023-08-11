function errorHandler(err, req, res, next) {
    let codeStatus;
    let errorMessage;

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            codeStatus = 400;
            errorMessage = err.errors[0].message;
            break;
        case "NullEmail":
            codeStatus = 400;
            errorMessage = "Email is required";
            break;
        case "NullPassword":
            codeStatus = 400;
            errorMessage = "Password is required";
            break;
        case "InvalidEmailPassword":
            codeStatus = 401;
            errorMessage = "Invalid email/password";
            break;
        case "NotFound":
            codeStatus = 404;
            errorMessage = "Data not found";
            break;
        default:
            codeStatus = 500;
            errorMessage = "Internal server error";
    }

    console.log(err);
    res.status(codeStatus).json({message: errorMessage});
}

module.exports = errorHandler;
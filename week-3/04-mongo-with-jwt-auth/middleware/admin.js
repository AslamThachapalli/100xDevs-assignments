const jwt = require('jsonwebtoken')

const jwtPassword = 'secret123';

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const tokenArray = authHeader.split(" ")
    const token = tokenArray[1];

    let isValid = true;

    try {
        jwt.verify(token, jwtPassword);
    } catch (_) {
        isValid = false;
    }

    if (isValid) { 
        next();
    }else{
        res.sendStatus(401);
    }
}

module.exports = adminMiddleware;
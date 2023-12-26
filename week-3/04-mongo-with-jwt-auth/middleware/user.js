const jwt = require("jsonwebtoken");
const jwtPassword = require("../utils/jwtPassword")

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const tokenArray = authHeader.split(" ");
    const token = tokenArray[1];

    let isValid = true;

    try{
        jwt.verify(token, jwtPassword)
    }catch(e){
        isValid = false;
    }

    if(isValid){
        next();
    }else{
        res.sendStatus(401);
    }
}

module.exports = userMiddleware;
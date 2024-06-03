const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new CustomAPIError("Auth token is invalid", 401)
    }

    // space after bearer is needed
    const token = authHeader.split("Bearer ").pop();

    try {
        // verify jason web token and decode, if token is correct add it to req object and pass it to next function.
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded token",decodedToken)
        const {id, username} = decodedToken
        req.user = {id, username}
        next();

    } catch(e) {
        throw new CustomAPIError("Unathorized", 401);
    }

}

module.exports = authenticationMiddleware;
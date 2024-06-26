const jwt = require("jsonwebtoken");
const {UnAuthenticated} = require("../errors")

const authenticationMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnAuthenticated("Auth token is invalid");
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
        throw new UnAuthenticated("Unathorized");
    }

}

module.exports = authenticationMiddleware;
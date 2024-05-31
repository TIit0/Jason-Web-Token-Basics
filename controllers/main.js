const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");



async function login(req, res) {
    const {username, password} = req.body

    // mongoose validations
    // Joi library
    // controller check as shown below

    if (username.trim() === "" || password.trim() === "" ) {
        throw new CustomAPIError("user and password cannot be blank", 400)
    }

    // just for learning, this us ussually provided by the DataBase
    const id = new Date().getDate() + Math.random();
    console.log(id)


    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: "30d"})
    return res.status(200).json({msg: `user created`, token})
}

async function dashboard(req, res) {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new CustomAPIError("Auth token is invalid", 401)
    }

    const token = authHeader.split("Bearer ").pop()
    const luckyNumber = Math.floor(Math.random()*100);

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({msg: `hello ${decodedToken.username}`, secret: `Here is your authorized data, your lucky nmber is ${luckyNumber} `});

    } catch(e) {
        throw new CustomAPIError("Unathorized", 401);
    }

    
}

module.exports = {login, dashboard}
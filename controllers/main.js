const CustomAPIError = require("../errors/custom-error")


async function login(req, res) {
    const {username, password} = req.body

    // mongoose validations
    // Joi library
    // controller check as shown below

    if (username.trim() === "" || password.trim() === "" ) {
        throw new CustomAPIError("user and password cannot be blank", 500)
    }

    return res.status(200).json({msg: `fake-login/register/signup route || secret stuff username: |${username}| password: |${password}|`, data: "hiiii"})
}

async function dashboard(req, res) {
    const {user = "eddy"} = req.query
    const luckyNumber = Math.floor(Math.random()*100);
    return res.status(200).json({msg: `hello ${user}`, secret: `Here is your authorized data, your lucky nmber is ${luckyNumber} `})
}

module.exports = {login, dashboard}
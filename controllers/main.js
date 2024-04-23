

function login(req, res) {
    return res.status(200).send(`fake-login/register/signup route`)
}

function dashboard(req, res) {
    const {user = "eddy"} = req.query
    const luckyNumber = Math.floor(Math.random()*100);
    return res.status(200).json({msg: `hello ${user}`, secret: `Here is your authorized data, your lucky nmber is ${luckyNumber} `})
}

module.exports = {login, dashboard}
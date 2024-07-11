const jwt = require("jsonwebtoken");
const {BadRequest} = require("../errors")



async function login(req, res) {
    const { username, password } = req.body

    // mongoose validations
    // Joi library
    // controller check as shown below

    if (username.trim() === "" || password.trim() === "") {
        throw new BadRequest("user and password cannot be blank")
    }

    // just for learning, this us ussually provided by the DataBase
    const id = new Date().getDate() + Math.random();
    console.log(id)


    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "30d" })
    return res.status(200).json({ msg: `user created`, token })
}

async function dashboard(req, res) {

    console.log("user obj", req.user); // req comes from middleware via next() |  req.user is attached at auth middleware |

    const luckyNumber = Math.floor(Math.random() * 100);
    return res.status(200).json({ msg: `hello ${req.user.username}`, secret: `Here is your authorized data, your lucky nmber is ${luckyNumber} ` });
}

module.exports = { login, dashboard }
const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controllers/main")



/* using option two for this project reference project 2 routes for more info */

// alt aka option one router.get("/dashboard", dashboard)
router.route("/dashboard").get(dashboard);
router.route("/login").post(login);


module.exports = router
const express = require("express");
const app = express();

require("dotenv").config();
require("express-async-errors");

const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");

/* router */
const mainRouter = require("./routes/main");

// middleware

// load static folder
app.use(express.static("./public"));

// get json and query strings
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes and 404
app.use("/api/v1", mainRouter);
app.use(notFoundMiddleWare);

// error handler
app.use(errorHandlerMiddleWare);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`))
    } catch(e) {
        console.log(e)
    }
}

start();
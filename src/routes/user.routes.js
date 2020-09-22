module.exports = app => {
    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    });

    // Create a new User
    router.post("/register", user.create);

    // Login
    router.post("/login", user.login);

    // Retrieve all user
    router.get("/", user.findAll);

    app.use('/api/users', router);
};
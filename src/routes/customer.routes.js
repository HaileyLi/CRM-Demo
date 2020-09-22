module.exports = app => {
    const customer = require("../controllers/customer.controller.js");

    var router = require("express").Router();
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    });

    // Create a new Customer
    router.post("/", customer.create);

    // Retrieve all customer
    router.get("/", customer.findAll);

    // Retrieve a single Customer with id
    router.get("/:id", customer.findOne);

    // Update a Customer with id
    router.put("/:id", customer.update);

    // Delete a Customer with id
    router.delete("/:id", customer.delete);

    // Delete all customers
    router.delete("/", customer.deleteAll);

    app.use('/api/customers', router);
};
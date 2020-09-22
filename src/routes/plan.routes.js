module.exports = app => {
    const plan = require("../controllers/plan.controller.js");

    var router = require("express").Router();
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    });

    // Create a new Plan
    router.post("/", plan.create);

    // Retrieve all plan
    router.get("/", plan.findAll);

    // Retrieve a single Plan with id
    router.get("/:id", plan.findOne);

    // Update a Plan with id
    router.put("/:id", plan.update);

    // Delete a Plan with id
    router.delete("/:id", plan.delete);

    // Delete all plans
    router.delete("/", plan.deleteAll);

    app.use('/api/plans', router);
};
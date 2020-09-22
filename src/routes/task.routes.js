module.exports = app => {
    const task = require("../controllers/task.controller.js");

    var router = require("express").Router();
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    });

    // Create a new Task
    router.post("/", task.create);

    // Retrieve all task
    router.get("/", task.findAll);

    // Retrieve a single Task with id
    router.get("/:id", task.findOne);

    // Update a Task with id
    router.put("/:id", task.update);

    // Delete a Task with id
    router.delete("/:id", task.delete);

    // Delete all Tasks
    router.delete("/", task.deleteAll);

    app.use('/api/tasks', router);
};
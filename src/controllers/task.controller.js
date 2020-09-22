const db = require("../models");
const Tasks = db.task;

// Create and Save a new Task
exports.create = (req, res) => {
    // Create a Task
    const task = new Tasks({
        _id: req.body.id,
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        detail: req.body.detail,
        priority: req.body.priority,
        user: req.body.user
    });

    // Save Task in the database
    task.save(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        });

};

// Retrieve all Tasks from the database based on user.
exports.findAll = (req, res) => {
    const user = req.query.user;
    var condition = user ? { user: user } : {};
    Tasks.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        });

};

// Find a single Task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tasks.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Task with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Task with id=" + id });
        });
};

// Update a Task with the specified id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tasks.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found!`
                });
            } else res.send({ message: "Task was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task with id=" + id
            });
        });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tasks.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                });
            } else {
                res.send({
                    message: "Task was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
    Tasks.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tasks were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tasks."
            });
        });
};
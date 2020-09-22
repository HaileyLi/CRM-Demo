const db = require("../models");
const Plans = db.plan;

// Create and Save a new plan
exports.create = (req, res) => {
    // Create a plan
    const plan = new Plans({
        _id: req.body.id,
        date: req.body.date,
        data: req.body.data.map(item =>
            ({
                id: item.id,
                text: item.text
            })),
        user: req.body.user,
    });
    // Save plan in the database
    plan.save(plan)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the plan."
            });
        });
};

// Retrieve all plans from the database.
exports.findAll = (req, res) => {
    const user = req.query.user;
    var condition = user ? { user: user } : {};
    Plans.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving plans."
            });
        });

};

// Find a single plan with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Plans.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Plan with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Plan with id=" + id });
        });
};

// Update a plan by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Plans.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Plan with id=${id}. Maybe Plan was not found!`
                });
            } else res.send({ message: "Plan was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Plan with id=" + id
            });
        });
};

// Delete a plan with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Plans.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Plans with id=${id}. Maybe Plan was not found!`
                });
            } else {
                res.send({
                    message: "Plan was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Plan with id=" + id
            });
        });
};

// Delete all plans from the database.
exports.deleteAll = (req, res) => {
    Plans.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Plans were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all plans."
            });
        });
};
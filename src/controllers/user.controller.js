const db = require("../models");
const Users = db.user;

// Create and Save a new user
exports.create = (req, res) => {
    // Create a user
    const user = new Users({
        password: req.body.password,
        username: req.body.username
    });

    // Save user in the database
    user.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });

};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    Users.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });

};
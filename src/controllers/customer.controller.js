const db = require("../models");
const Customers = db.customer;

// Create and Save a new customer
exports.create = (req, res) => {
    // Create a customer
    const customer = new Customers({
        _id: req.body.id,
        IELTS: req.body.IELTS,
        address: req.body.address,
        alternativePhone: req.body.alternativePhone,
        birthDate: req.body.birthDate,
        caseDepNote: req.body.caseDepNote,
        checklst: req.body.checklst.map(item => ({
            expanded: item.expanded,
            finished: item.finished,
            items: item.items.map(it => ({
                text: it.text,
                finished: it.finished,
                note: it.note
            })),
            note: item.note,
            text: item.text
        })),
        education: req.body.education,
        email: req.body.email,
        employmentDepartment: req.body.employmentDepartment,
        employmentDuration: req.body.employmentDuration,
        employmentPosition: req.body.employmentPosition,
        employmentStatus: req.body.employmentStatus,
        gender: req.body.gender,
        major: req.body.major,
        contactHistory: req.body.contactHistory.map(item => ({
            date: item.date,
            direction: item.direction,
            id: item.id,
            note: item.note,
            contactType: item.contactType
        })),
        maritalStatus: req.body.maritalStatus,
        marketingDepNote: req.body.marketingDepNote,
        name: req.body.name,
        passportExpireDate: req.body.passportExpireDate,
        passportID: req.body.passportID,
        passportIssueDate: req.body.passportIssueDate,
        phone: req.body.phone,
        progress: req.body.progress.map(item => ({
            title: item.title,
            passed: item.passed,
            note: item.note
        })),
        serviceDetail: req.body.serviceDetail,
        status: req.body.status,
        subMember: req.body.subMember.map(item => ({
            age: item.age,
            circulatingAssets: item.circulatingAssets,
            education: item.education,
            employment: item.employment,
            fixedAssets: item.fixedAssets,
            id: item.id,
            name: item.name,
            relation: item.relation
        })),
        user: req.body.user,
        wechatID: req.body.wechatID
    });

    // Save customer in the database
    customer.save(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the customer."
            });
        });

};

// Retrieve all customers from the database.
exports.findAll = (req, res) => {
    const user = req.query.user;
    var condition = user ? { user: user } : {};
    Customers.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        });

};

// Find a single customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Customers.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Customer with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Customer with id=" + id });
        });
};

// Update a customer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Customers.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
                });
            } else res.send({ message: "Customer was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
};

// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Customers.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            } else {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};

// Delete all customers from the database.
exports.deleteAll = (req, res) => {
    Customers.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Customers were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        });
};
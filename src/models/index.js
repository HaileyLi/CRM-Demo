const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.task = require("./task.model.js")(mongoose);
db.plan = require("./plan.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);
db.customer = require("./customer.model.js")(mongoose);

module.exports = db;
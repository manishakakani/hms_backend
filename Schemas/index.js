const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.bookings = require("./Bookings.model.js")(mongoose);
db.payments = require("./Payments.model.js")(mongoose);
db.person = require("./Person.model.js")(mongoose);
db.room = require("./Room.model.js")(mongoose);
db.roomTypes = require("./RoomTypes.model.js")(mongoose);

module.exports = db;

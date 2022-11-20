let express = require("express");
let { Request, Response, NextFunction } = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
const mongoose = require("mongoose");
const mongoserver = "127.0.0.1:27017";
const http = require("http");
const server = http.createServer(app);
const database = "HMS";
// mongoose
//   .connect(`mongodb://${mongoserver}/${database}`)
//   .then(() => {
//     console.log("MongoDB connected!!");
//   })
//   .catch((err) => {
//     console.log("Failed to connect to MongoDB", err);
//   });

const db = require("./Schemas/index.js");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/public", express.static("public"));

const bookings = require("./router/Bookings");
app.use("/api/bookings", bookings);

const payments = require("./router/Payments");
app.use("/api/payments", payments);

const person = require("./router/Person");
app.use("/api/person", person);

const room = require("./router/Room");
app.use("/api/room", room);

const roomtypes = require("./router/RoomTypes");
app.use("/api/roomtypes", roomtypes);

server.listen(5000, () => {
  console.log("Server connected successfully:", 5000);
});

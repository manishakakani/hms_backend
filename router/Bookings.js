let express = require("express");
const db = require("../Schemas");
const Bookings = db.bookings;
// const { Bookings } = require("../Schemas/Bookings.model");
let router = express.Router();

router.get("/bookings", async (req, res) => {
  try {
    console.log("allBookings");
    Bookings.find()
      .then((books) => {
        console.log({ books });
        res.status(200).send(books);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

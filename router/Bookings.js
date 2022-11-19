let express = require("express");
const { Bookings } = require("../Schemas/Bookings");
let router = express.Router();

router.get("/allBookings", async (req, res) => {
  try {
    Bookings.find()
      .then((books) => {
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

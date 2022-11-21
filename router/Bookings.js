let express = require("express");
const db = require("../Schemas");
const Bookings = db.bookings;
// const { Bookings } = require("../Schemas/Bookings.model");
let router = express.Router();

router.get("/bookings", async (req, res) => {
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

router.get("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    Bookings.find({ BookingID: id })
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

router.get("/bookings/person/:id", async (req, res) => {
  const { id } = req.params;
  try {
    Bookings.find({ CustomerUniqueNumber: id })
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

router.get("/bookings/person/:id", async (req, res) => {
  const { id } = req.params;
  try {
    Bookings.find({ CustomerUniqueNumber: id })
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

router.get("/bookings/bookingdate/:date", async (req, res) => {
  const { date } = req.params;
  try {
    Bookings.find({ BookingDates: new Date(date) })
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

router.post("/bookings", async (req, res) => {
  const data = req.body;
  const booking = new Bookings(data);
  try {
    booking
      .save(booking)
      .then((response) => {
        res.status(200).send("Successfully inserted!");
      })
      .catch((err) => {
        console.log({ err });
        res.status(400).send(err);
      });
  } catch (error) {
    console.log({ error });
    res.status(400).send(error);
  }
});

router.post("/bookings", async (req, res) => {
  const data = req.body;
  const booking = new Bookings(data);
  try {
    booking
      .save(booking)
      .then((response) => {
        res.status(200).send("Successfully inserted!");
      })
      .catch((err) => {
        console.log({ err });
        res.status(400).send(err);
      });
  } catch (error) {
    console.log({ error });
    res.status(400).send(error);
  }
});

router.patch("/bookings/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Bookings.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Bookings with id=${id}. Maybe Booking was not found!`,
        });
      } else res.send({ message: "Bookings updated successfully." });
    })
    .catch((err) => {
      console.log({ err });
      res.status(500).send({
        message: "Error updating Booking with id=" + id,
      });
    });
});

router.delete("/bookings/:id", (req, res) => {
  try {
    Bookings.deleteOne({ id: req.params.id })
      .then((response) => res.status(200).send("Successfully Deleted!"))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

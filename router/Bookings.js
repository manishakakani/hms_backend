let express = require("express");
const db = require("../Schemas");
const Bookings = db.bookings;
const Payments = db.payments;
const Room = db.room;
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
    Bookings.find({ BookingDates: date })
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

router.get("/bookings/today/:cusuniqnum", async (req, res) => {
  const { cusuniqnum } = req.params;
  let date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  try {
    Bookings.find({
      CustomerUniqueNumber: cusuniqnum,
      BookingDates: date.toISOString(),
    })
      .then((books) => {
        let rooms = [];
        books.map((bk, idx) => {
          Room.find({ RoomID: { $in: bk.RoomIDs } }).then((room) => {
            rooms.push(room);
            if (idx == books.length - 1) res.status(200).send(rooms);
          });
        });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/pastbookings", (req, res) => {
  try {
    let date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    Bookings.find({ BookingDates: { $not: { $gte: date.toISOString() } } })
      .then((books) => res.status(200).send(books))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    console.log({ error });
    res.status(400).send(error);
  }
});

router.get("/futurebookings", (req, res) => {
  try {
    let date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    Bookings.find({ BookingDates: { $not: { $lte: date.toISOString() } } })
      .then((books) => res.status(200).send(books))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    console.log({ error });
    res.status(400).send(error);
  }
});

const generateBookingID = () => {
  let val = "BOOK" + Math.floor(Math.random() * 10000);
  return Bookings.find({ BookingID: val }).then(async (res) => {
    if (res.length > 0) return await generateBookingID();
    return val;
  });
};

router.post("/bookings", async (req, res) => {
  const data = req.body;
  data.BookingID = await generateBookingID();
  const booking = new Bookings(data);
  try {
    booking
      .save(booking)
      .then((response) => {
        const paydata = {
          ReservationNumber: data.BookingID,
          TotalAmount: data.TotalAmount,
          PaymentStatus: "Unpaid",
          AmountPaid: "0",
          PaymentDate: "",
        };
        const payment = new Payments(paydata);
        payment
          .save(payment)
          .then((response2) => {
            res.status(200).send("Successfully inserted!");
          })
          .catch((err) => {
            console.log({ err });
            res.status(400).send(err);
          });
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

router.post("/availability/:roomType", (req, res) => {
  Room.find({ RoomTypeID: req.params.roomType })
    .then((result) => {
      Bookings.find({
        RoomTypeID: req.params.roomType,
        BookingDates: req.body.date,
      })
        .then((response) => {
          let count = 0;
          response.map((book) => (count += book.NumberOfRooms));
          res.status(200).send({ [req.body.date]: result.length - count });
        })
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
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
    Bookings.deleteOne({ _id: req.params.id })
      .then((response) => res.status(200).send("Successfully Deleted!"))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

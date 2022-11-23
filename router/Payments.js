let express = require("express");
let router = express.Router();
let db = require("../Schemas");
let Payments = db.payments;

router.get("/payments", (req, res) => {
  Payments.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.get("/payments/:reservationNumber", (req, res) => {
  const resNum = req.params.reservationNumber;
  Payments.find({ ReservationNumber: resNum })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.post("/payments", async (req, res) => {
  const data = req.body;
  console.log({ data });
  const payment = new Payments(data);
  try {
    payment
      .save(payment)
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

router.patch("/payments/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Payments.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Payments with id=${id}. Maybe Payment details was not found!`,
        });
      } else res.send({ message: "Payment Details updated successfully." });
    })
    .catch((err) => {
      console.log({ err });
      res.status(500).send({
        message: "Error updating Payment details with id=" + id,
      });
    });
});

router.delete("/payments/:id", (req, res) => {
  try {
    Payments.deleteOne({ _id: req.params.id })
      .then((response) => res.status(200).send("Successfully Deleted!"))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

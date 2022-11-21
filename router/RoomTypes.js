let express = require("express");
let router = express.Router();
let db = require("../Schemas");
let RoomTypes = db.roomTypes;

router.get("/roomtypes", (req, res) => {
  RoomTypes.find()
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

router.get("/roomtypes/:roomtypeid", (req, res) => {
  RoomTypes.find({ RoomTypeID: req.params.roomtypeid })
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

router.post("/roomtypes", (req, res) => {
  const data = req.body;
  const roomtype = new RoomTypes(data);
  try {
    roomtype
      .save(roomtype)
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

router.patch("/roomtypes/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  RoomTypes.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update room type with id=${id}. Maybe room type was not found!`,
        });
      } else res.send({ message: "Room Type updated successfully." });
    })
    .catch((err) => {
      console.log({ err });
      res.status(500).send({
        message: "Error updating Booking with id=" + id,
      });
    });
});

router.delete("/roomtypes/:id", (req, res) => {
  try {
    RoomTypes.deleteOne({ _id: req.params.id })
      .then((response) => res.status(200).send("Successfully Deleted!"))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

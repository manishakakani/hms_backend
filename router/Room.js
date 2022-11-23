let express = require("express");
let router = express.Router();
let db = require("../Schemas");
let Room = db.room;

router.get("/room", (req, res) => {
  Room.find()
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

router.get("/room/:roomid", (req, res) => {
  Room.find({ RoomID: req.params.roomid })
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

router.get("/servicerequested", (req, res) => {
  Room.find({ ServiceRequested: true })
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

router.get("/roomsavailable", (req, res) => {
  Room.find({ isRoomAvailable: true })
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

router.get("/roomtype/:roomtypeid", (req, res) => {
  Room.find({ RoomTypeID: req.params.roomtypeid })
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

router.post("/room", async (req, res) => {
  const data = req.body;
  const room = new Room(data);
  try {
    room
      .save(room)
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

router.patch("/room/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Room.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update room with id=${id}. Maybe room was not found!`,
        });
      } else res.send({ message: "Room updated successfully." });
    })
    .catch((err) => {
      console.log({ err });
      res.status(500).send({
        message: "Error updating room with id=" + id,
      });
    });
});

router.delete("/room/:id", (req, res) => {
  try {
    Room.deleteOne({ _id: req.params.id })
      .then((response) => res.status(200).send("Successfully Deleted!"))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

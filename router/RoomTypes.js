let express = require("express");
let router = express.Router();
let db = require("../Schemas");
let RoomTypes = db.roomTypes;
let Room = db.room;

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

const generateRoomTypeID = () => {
  let val = "RT" + Math.floor(Math.random() * 10000);
  return RoomTypes.find({ RoomTypeID: val }).then(async (res) => {
    if (res.length > 0) return await generateRoomTypeID();
    return val;
  });
};

const generateRoomID = () => {
  let val = "RD" + Math.floor(Math.random() * 10000);
  return Room.find({ RoomID: val }).then(async (res) => {
    if (res.length > 0) return await generateRoomID();
    return val;
  });
};

router.post("/roomtypes", async (req, res) => {
  const data = req.body;
  const roomtypeid = await generateRoomTypeID();
  data.RoomTypeID = roomtypeid;
  data.Availability = data.Availability.filter((r) => r !== "");
  const roomtype = new RoomTypes(data);
  try {
    roomtype
      .save(roomtype)
      .then((response) => {
        const availability = data.Availability;
        if (availability.length) {
          availability.map(async (a, idx) => {
            if (a != "") {
              let roomdata = {
                RoomTypeID: roomtypeid,
                RoomNumber: a,
                RoomID: await generateRoomID(),
                isRoomAvailable: true,
                ServiceRequested: false,
              };
              console.log({ roomtypeid: data.RoomTypeID });
              const room = new Room(roomdata);
              room.save(room).then((result) => {
                if (idx == availability.length - 1)
                  res.status(200).send("Successfully inserted!");
              });
            }
          });
        } else res.status(200).send("Successfully inserted!");
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
  const data = req.body;
  console.log({ data });
  if (data.Availability.length) {
    data.Availability = data.Availability.filter((r) => r !== "");
    data.Availability.map((id) => {
      Room.find({ RoomNumber: id }).then(async (result) => {
        if (result.length == 0) {
          let roomdata = {
            RoomTypeID: data.RoomTypeID,
            RoomNumber: id,
            RoomID: await generateRoomID(),
            isRoomAvailable: true,
            ServiceRequested: false,
          };
          console.log({ roomtypeid: data.RoomTypeID });
          const room = new Room(roomdata);
          await room.save(room);
        }
      });
    });
  }

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

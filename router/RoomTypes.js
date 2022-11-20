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

module.exports = router;

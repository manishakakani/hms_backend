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

module.exports = router;

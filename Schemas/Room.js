const { mongoose } = require("mongoose");

const RoomSchema = new mongoose.Schema({
  RoomID: String,
  RoomNumber: Number,
  RoomTypeID: String,
  isRoomAvailable: Boolean,
  ServiceRequested: Boolean,
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = { Room };

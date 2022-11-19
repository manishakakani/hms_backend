const { mongoose } = require("mongoose");

const RoomTypesSchema = new mongoose.Schema({
  RoomType: String,
  RoomTypeID: String,
  Availability: Array,
  Images: Array,
  Rate: String,
});

const RoomTypes = mongoose.model("RoomTypes", RoomTypesSchema);

module.exports = { RoomTypes };

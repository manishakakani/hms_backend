module.exports = (mongoose) => {
  const RoomSchema = new mongoose.Schema({
    RoomID: String,
    RoomNumber: Number,
    RoomTypeID: String,
    isRoomAvailable: Boolean,
    ServiceRequested: Boolean,
  });

  RoomSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Room = mongoose.model("Room", RoomSchema);

  return Room;
};

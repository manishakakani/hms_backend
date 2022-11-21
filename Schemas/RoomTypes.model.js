module.exports = (mongoose) => {
  const RoomTypesSchema = new mongoose.Schema({
    RoomType: String,
    RoomTypeID: String,
    Availability: Array,
    Images: Array,
    Rate: String,
  });

  RoomTypesSchema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const RoomTypes = mongoose.model("RoomTypes", RoomTypesSchema);

  return RoomTypes;
};

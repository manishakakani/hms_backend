module.exports = (mongoose) => {
  const BookingsSchema = new mongoose.Schema({
    StartDate: Date,
    Duration: Number,
    CheckInTime: String,
    CheckOutTime: String,
    TotalAmount: String,
    NumberOfRooms: Number,
    AdditionalCharges: String,
    SubTotal: String,
    CustomerUniqueNumber: String,
    BookingID: String,
    BookingDates: Array,
    RoomIDs: Array,
  });
  BookingsSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Bookings = mongoose.model("Bookings", BookingsSchema);

  return Bookings;
};

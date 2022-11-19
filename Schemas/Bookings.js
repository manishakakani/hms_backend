const { mongoose } = require("mongoose");

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

const Bookings = mongoose.model("Bookings", BookingsSchema);

module.exports = { Bookings };

const { mongoose } = require("mongoose");

const PaymentsSchema = new mongoose.Schema({
  ReservationNumber: String,
  TotalAmount: String,
  PaymentStatus: String,
  AmountPaid: String,
  PaymentDate: String,
});

const Payments = mongoose.model("Payments", PaymentsSchema);

module.exports = { Payments };

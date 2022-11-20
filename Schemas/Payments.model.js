module.exports = (mongoose) => {
  const PaymentsSchema = new mongoose.Schema({
    ReservationNumber: String,
    TotalAmount: String,
    PaymentStatus: String,
    AmountPaid: String,
    PaymentDate: String,
  });
  PaymentsSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Payments = mongoose.model("Payments", PaymentsSchema);

  return Payments;
};

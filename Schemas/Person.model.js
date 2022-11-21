module.exports = (mongoose) => {
  const PersonSchema = new mongoose.Schema({
    UniqueNumber: String,
    Name: String,
    Address: String,
    PhoneNumber: String,
    EmailID: String,
    SSN: String,
    Password: String,
    Role: String,
  });

  PersonSchema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Person = mongoose.model("Person", PersonSchema);

  return Person;
};

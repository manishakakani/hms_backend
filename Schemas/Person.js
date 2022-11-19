const { mongoose } = require("mongoose");

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

const Person = mongoose.model("Person", PersonSchema);

module.exports = { Person };

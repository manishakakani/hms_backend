let express = require("express");
let router = express.Router();
let db = require("../Schemas");
let Person = db.person;

router.get("/person", (req, res) => {
  Person.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.get("/person/:uniquenumber", (req, res) => {
  Person.find({ UniqueNumber: req.params.uniquenumber })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.get("/staff", (req, res) => {
  Person.find({ Role: "Staff" })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.get("/person/login/:EmailID/:pw", (req, res) => {
  Person.find({ EmailID: req.params.EmailID, Password: req.params.pw })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

const generatePersonID = (prefix) => {
  let val = prefix + Math.floor(Math.random() * 10000);
  return Person.find({ UniqueNumber: val }).then((res) => {
    if (res.length > 0) return null;
    return val;
  });
};

router.post("/person", async (req, res) => {
  const data = req.body;
  const prefix =
    data.Role === "Admin" ? "ADM" : data.Role === "Staff" ? "STF" : "CUS";
  data.UniqueNumber = await generatePersonID(prefix);
  const person = new Person(data);
  try {
    person
      .save(person)
      .then((response) => {
        res.status(200).send("Successfully inserted!");
      })
      .catch((err) => {
        console.log({ err });
        res.status(400).send(err);
      });
  } catch (error) {
    console.log({ error });
    res.status(400).send(error);
  }
});

router.patch("/person/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update person with id=${id}. Maybe person was not found!`,
        });
      } else res.send({ message: "Person updated successfully." });
    })
    .catch((err) => {
      console.log({ err });
      res.status(500).send({
        message: "Error updating person with id=" + id,
      });
    });
});

router.delete("/person/:id", (req, res) => {
  try {
    Person.deleteOne({ id: req.params.id })
      .then((response) => res.status(200).send("Successfully Deleted!"))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

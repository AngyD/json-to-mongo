const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  //Define your schema here based on the structure of your data.json.(e.g Student)
  name: { type: String, required: [true, "A student must have a name"] },
  lastname: {
    type: String,
    required: [true, "A student must have a lastname"],
  },
  photo: {
    type: String,
    default: "default.png",
  },
  age: {
    type: Number,
    required: [true, "A student must have an age"],
  },
  email: {
    type: String,
    required: [true, "A student must have an email"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

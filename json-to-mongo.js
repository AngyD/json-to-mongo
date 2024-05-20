const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

const Student = require("./models/studentModel");
dotenv.config({ path: "./config.env" });

const MONGO_URI = process.env.DATABASE.replace(
  "<USERNAME>",
  process.env.DATABASE_USERNAME
)
  .replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
  .replace("<DBNAME>", process.env.DATABASE_NAME);

//Connection to db
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

//read json file
const students = JSON.parse(fs.readFileSync("data.json", "utf-8"));

//import data into db
const importData = async () => {
  try {
    await Student.create(students);
    console.log("Data successfully imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// delete data from db

const deleteData = async () => {
  try {
    await Student.deleteMany();
    console.log("Data successfully deleted!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

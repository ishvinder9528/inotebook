const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoURI = process.env.URI;

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to DataBase Successfully");
    })
    .catch((error) => {
      console.log("Error => ", error);
    });
};

module.exports = connectToMongo;

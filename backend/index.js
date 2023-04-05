const connectToMongo = require("./db");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.get("/", (req, res) => {
  res.send("Helloooo");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port http://localhost:" + process.env.PORT);
});


connectToMongo();
  

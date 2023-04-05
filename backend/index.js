const connectToMongo = require("./db");
const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const auth = require("./routes/auth");
const notes = require("./routes/notes");

app.use("/api/auth", auth);

app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port http://localhost:" + process.env.PORT);
});

connectToMongo();

const connectToMongo = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const auth = require("./routes/auth");
const notes = require("./routes/notes");

app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port http://localhost:" + process.env.PORT);
});

connectToMongo();

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Notes = require("../models/Notes");

// post the data to the /api/auth
router.post("/", (req, res) => {
  try {
    const user = User(req.body);
    console.log(req.body);
    user.save();
    res.send(user);
  } catch (error) {
    console.log("Error Found => ", error.message);
  }
});

// router.get('/', async(req, res) => {
//    const response = await fetch()
//     res.send()
// })

module.exports = router;

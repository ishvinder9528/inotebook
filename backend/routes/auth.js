const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// post the data to the /api/auth
router.post(
  "/",
  [
    body("name", "invalid name, enter more than 5 character").isLength({
      min: 5,
    }),
    body("email", "invalid email").isEmail(),
    body("password", "invalid name, enter more than 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userAdded = await User.create({
        name: name,
        email: email,
        password: password,
      });
      console.log(req.body);
      res.status(200).json(userAdded);
    } catch (error) {
      console.log("Error Found => ", error);
      res.status(400).json({ Error: error.message });
    }
  }
);

//  Get data
router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.log("Error Found => ", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

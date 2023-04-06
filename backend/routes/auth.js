const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

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

    // give error when there is some syntax error by User
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // hasing /brcyptjs

    const salt = await bcrypt.genSaltSync(10);
    const secPassword = await bcrypt.hash(password, salt);

    // send data to api
    try {
      const userAdded = await User.create({
        name: name,
        email: email,
        password: secPassword,
      });

      const{id} = userAdded;
      const data = {
        userAdded: {
          id: id,
        },
      };

      // using jwtAuth here
      try {
        const authToken =  jwt.sign(data, jwtSecretKey);
        console.log(authToken);

        res.status(200).json(userAdded);
        console.log(userAdded);

      } catch (error) {
        console.log("Error =>", err);
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      // check if there is some internal error/
      let user = await User.findOne({ email: email });
      if (user) {
        res.status(400).json({ Error: "email already exists" });
        console.error("Error => email already exists");
      } else {
        console.log("Err or Found => ", error);
        res.status(500).json({ error: error.message });
      }
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

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const fetchuser = require("../middleware/fetchuser");

//ROUTE 1: post the data to the /api/auth/createuser, no login required
router.post("/createuser", [
  body("name", "invalid name, enter more than 5 character").isLength({ min: 5, }),
  body("email", "invalid email").isEmail(),
  body("password", "invalid name, enter password than 5 character").isLength({ min: 5, }),
],
  async (req, res) => {

    // give error when there is some BAD request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    // hasing /brcyptj
    const salt = await bcrypt.genSaltSync(10);
    const secPassword = await bcrypt.hash(password, salt);

    // send data to api
    try {
      const user = await User.create({
        name,
        email,
        password: secPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      // using jwtAuth here
      try {
        const authToken = jwt.sign(data, jwtSecretKey);
        console.log(authToken);

        res.status(200).json(user);
        console.log(user);
      } catch (error) {
        console.log("Error =>", err);
        res.status(500).send("Internal Server Error");
      }
    } catch (error) {
      // check if there is some internal error/
      let user = await User.findOne({ email: email });
      if (user) {
        console.error("Error => email already exists");
        return res.status(400).json({ error: "email already exists" });
      } else {
        console.log("Error Found => ", error);
        return res.status(500).json({ error: error.message });
      }
    }
  }
);

//ROUTE 2:  authenticate a user using POST: http://localhost:5000/api/auth/login, no login required
router.post(
  "/login",
  [
    body("email", "invalid email").isEmail(),
    body("password", "enter something in password").exists(),
  ],

  async (req, res) => {
    // give error when there is some syntax error by User
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // send data to api
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter valid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please enter valid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecretKey);
      console.warn(user);
      res.status(200).json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3:  Get data from logged in user GET request http://localhost:5000, login required
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).send(user);
    console.log(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

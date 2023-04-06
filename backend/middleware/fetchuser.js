const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const fetchuser = async (req, res, next) => {
  // get the user data from the jwt token and add it to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate with the valid token" });
  }
  try {
    const data = jwt.verify(token, jwtSecretKey);
    req.user = data.user;

  } catch (error) {
    console.error("Internal error: " + error);
    res.status(401).send({ error: "Please authenticate with the valid token" });
  }
  next();
};

module.exports = fetchuser;

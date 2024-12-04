const express = require("express");
const router = express.Router();
const { signup } = require("../controller/signup");
const { login } = require("../controller/login");

router.get("/", (req, res) => {
  res.json({ message: "This route is only for users!" });
});

//signup
router.post("/signup", signup);

//login
router.post("/login", login);

module.exports = router ;

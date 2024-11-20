const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Regoster User
router.post("/register", async (req, res) => {
  const user = req.body;
  // Input validation
  if (!user.name || !user.email || !user.password || !user.role) {
    return res.status(400).send({ message: "All fields are required" });
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
    return res.status(400).send({ message: "Invalid email format" });
  }
  if (user.password.length < 6) {
    return res
      .status(400)
      .send({ message: "Password must be at least 6 characters long" });
  }
  user.password = bcrypt.hashSync(user.password, 10);
  //adding user in the db
  const dbUser = await User.create(user);
  res.send({ newUser: dbUser, message: "User created successfully" });
});

//login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const dbUser = await User.findOne({ email });
  console.log(dbUser, '----------------------------->');
  if (!dbUser) {
    return res.status(404).send({ message: "Email not found" });
  }
  const samePassword = await bcrypt.compareSync(password, dbUser.password);
  if (!samePassword) {
    return res.status(404).send({ message: "Password incorrect" });
  }
  const token = jwt.sign(
    { id: dbUser.id, role: dbUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.send({ message: "Logged in successfully!", token });
});



module.exports = router;

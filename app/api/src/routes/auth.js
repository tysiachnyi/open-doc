const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/User.js");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new UserSchema({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await UserSchema.findOne({
      email: req.body.email,
    });
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!user || !validated) {
      return res.status(400).json("Wrong credentials!");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );

    res.status(200).send({
      message: "Login Successful",
      email: user.email,
      userId: user._id,
      name: user.name,
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

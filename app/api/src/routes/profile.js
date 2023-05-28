const router = require("express").Router();
const UserSchema = require("../models/User");

// GET USER

router.get("/", async (req, res) => {
  console.log("req.query.id", req.query.id);
  try {
    const user = await UserSchema.findById(req.query.id);
    console.log("user", user);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

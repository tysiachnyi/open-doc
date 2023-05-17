const mongoose = require("mongoose");
const dotenv = require("dotenv");

function connectToDB() {
  mongoose.set("strictQuery", true);
  dotenv.config();

  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
}

module.exports = connectToDB;

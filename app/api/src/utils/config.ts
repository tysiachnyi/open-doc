import dotenv from "dotenv";

import mongoose from "mongoose";

export function connectToDB() {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(dotenv.config().parsed!.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
}

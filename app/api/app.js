const express = require("express");
const cors = require("cors");
const auth = require("./auth");
const authRoute = require("./src/routes/auth.js");
const projectRoute = require("./src/routes/project.js");
const connectToDB = require("./src/utils/config.js");
const PORT = 8080;

// INIT APP
const app = express();
connectToDB();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});
app.use(express.json());

app.get("/api/check", async (req, res) => {
  res.status(200).json("All work fine");
});

app.use("/api/auth", authRoute);
app.use("/api/project", projectRoute);

// free endpoint
app.get("/api/free-endpoint", (req, res) => {
  res.status(200).json({ message: "You are Free to access me anytime" });
});

// authentication endpoint
app.get("/api/auth-endpoint", auth, (req, res) => {
  res.status(200).json({ message: "You are Auth to access me anytime" });
});

// LISTEN TO PORT
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});

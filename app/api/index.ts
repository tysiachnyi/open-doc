import express from "express";
import { connectToDB } from "./src/utils/config";

const app = express();
const port = 8080;

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

app.get("/", (req, res) => {
  res.send("Hello from api");
});

connectToDB();

app.listen(port, () => {
  console.log(`api listening at http://localhost:${port}`);
});

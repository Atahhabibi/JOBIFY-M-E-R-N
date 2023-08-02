import "express-async-errors"
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import Jobsrouter from "./routes/jobRouter.js";
import mongoose from "mongoose";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.post("/", (req, res) => {
  res.json({ message: "Data received", data: req.body });
});

app.use("/api/v1/jobs", Jobsrouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "NOT FOUND" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("******** CONNECTED TO DATABSE ****************");
  });
  app.listen(port, () => {
    console.log(`********SERVER LISTENING ON PORT:${port} *******`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

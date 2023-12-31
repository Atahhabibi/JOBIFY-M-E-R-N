import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import Jobsrouter from "./routes/jobRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import authRouter from "./routes/authRouter.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";
// import "./populate.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
}
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());


app.use("/api/v1/jobs", authenticateUser, Jobsrouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'./client/dist','index.html'))
})

app.use("*", (req, res) => {
  res.status(404).json({ msg: "NOT FOUND" });
});

app.use(errorHandlerMiddleware);

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

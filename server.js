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

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());


app.get('/api/v1/test',(req,res)=>{
  res.json({msg:'test route'})
})


app.use("/api/v1/jobs",authenticateUser, Jobsrouter);
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',authenticateUser,userRouter)

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

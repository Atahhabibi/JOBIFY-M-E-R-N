import mongoose, { model } from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending"
    },
    jobtype: {
      type: String,
      enum: ["full-time", "part-time", "intership"],
      default: "full-time"
    },
    jobLocation: {
      type: String,
      default: "my city"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);

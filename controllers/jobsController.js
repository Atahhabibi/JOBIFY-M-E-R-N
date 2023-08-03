import { StatusCodes } from "http-status-codes";
import Job from "../modals/jobModels.js";

//GET ALL JOBS

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

//CREATE JOB

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Job Created", job });
};

//GET SINGLE JOB

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "Job Found", job });
};

//UDPATE JOB

export const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ msg: "job Modified", job });
};

//DELETE JOB

export const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "job deleted", job });
};

import Job from "../modals/jobModels.js";

//GET ALL JOBS

export const getAllJobs = async (req, res) => {

const jobs=await Job.find({});
  res.status(200).json({ count:jobs.length,jobs });
};

//CREATE JOB

export const createJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(201).json({ msg: "Job Created", job });
};



//GET SINGLE JOB

export const getJob = async (req, res) => {
  const { id } = req.params;
  
  const job =await Job.findById(id);

  if (!job) {
    return res.status(404).json({ msg: `job not found with this id:${id}` });
  }
  res.status(200).json({msg:"Job Found",job });
};



//UDPATE JOB

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id,req.body,{new:true});

  if (!job) {
    return res.status(404).json({ msg: `jobs not found with this id:${id}` });
  }

  res.status(200).json({ msg: "job Modified", job });
};

//DELETE JOB

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findByIdAndDelete(id);

  if (!job) {
    return res.status(404).json({ msg: `jobs not found with this id:${id}` });
  }

  res.status(200).json({ msg: "job deleted", job });
};

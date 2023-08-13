import { useAllJobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import { PageBtnContainer } from ".";

const JobsContainers = () => {
  const { data } = useAllJobsContext();
  const { jobs,numOfPages,totalJobs} = data;

  if (jobs.length <= 0) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  );
};
export default JobsContainers;

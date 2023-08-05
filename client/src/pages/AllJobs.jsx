import { createContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import SearchContainer from "../components/SearchContainer";
import customFetch from "../utils/customFetch";
import JobsContainer from "../components/JobsContainers";
import { useContext } from "react";

export const loader = async ({ request }) => {
  try {
    const response = await customFetch.get("/jobs");
    const data = response.data;
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => {
  return useContext(AllJobsContext);
};
export default AllJobs;

import { createContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import SearchContainer from "../components/SearchContainer";
import customFetch from "../utils/customFetch";
import JobsContainer from "../components/JobsContainers";
import { useContext } from "react";

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const response = await customFetch.get("/jobs", { params });
    const data = response.data;
    // data.currentPage=Number(params.page)

    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data,searchValues} = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data,searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => {
  return useContext(AllJobsContext);
};
export default AllJobs;

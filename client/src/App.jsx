import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardLayout,
  HomeLayout,
  Landing,
  Login,
  Register,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from "./pages";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as createJobAction } from "./pages/AddJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import {
  action as EditJobAction,
  loader as EditJobLoader,
} from "./pages/EditJob";
import { action as deleteAction } from "./pages/DeleteJob";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: createJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            action: EditJobAction,
            loader: EditJobLoader,
          },

          {
            path: "delete-job/:id",
            action:deleteAction
          },

          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

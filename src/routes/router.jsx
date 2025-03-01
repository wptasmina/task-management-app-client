
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from './../components/Page/ErrorPage';
import Home from './../components/Page/HomePage/Home';

import Ragister from "../components/auth/Ragister/Ragister";
import MainLayouts from "../components/layouts/MainLayouts";
import LoginPage from "../components/auth/Login/LoginPage";
import Dashboard from "../components/Page/Task-Board-Component/Dashbord/Dashboard";
import Task_Add from "../components/Page/Task-Board-Component/components/Add-Task/Task_Add";
import TaskUpdate from "../components/Page/Task-Board-Component/components/Task/TaskUpdate";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/add-task",
        element: <Task_Add />,
      },
      {
        path: "/update-task/:id",
        element: <TaskUpdate />,
      },
      {
        path: "/ragister",
        element: <Ragister />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import ErrorPage from './../components/Page/ErrorPage';
import Home from './../components/Page/HomePage/Home';
import Task from './../components/Page/Task-Board-Component/Task';
import Comments from './../components/Page/Task-Board-Component/Comments';

import Ragister from "../components/auth/Ragister/Ragister";
import MainLayouts from "../components/layouts/MainLayouts";
import LoginPage from "../components/auth/Login/LoginPage";
import Dashbord from "../components/Page/Task-Board-Component/Dashbord/Dashbord";



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
        path: "/dashbord",
        element: <Dashbord />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/task",
        element: <Task />,
      },
      {
        path: "/comments/:category/:id",
        element: <Comments />,
      },
      {
        path: "/ragister",
        element: <Ragister />,
      },
    ],
  },
]);
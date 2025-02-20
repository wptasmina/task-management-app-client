
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import ErrorPage from "../component/Page/ErrorPage";
import Home from './../component/Page/HomePage/Home';

import Login from "../component/auth/Login/Login";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
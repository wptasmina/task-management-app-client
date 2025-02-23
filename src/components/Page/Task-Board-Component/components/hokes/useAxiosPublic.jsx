

import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://task-managment-app-server-omega.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

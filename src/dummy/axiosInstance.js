import axios from "axios";
import { API_BASE_URL } from "./const";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error.response.status === 403 ? 'Tidak ': 'Ya');
    return Promise.reject(error);
  }
);

export default axiosInstance;

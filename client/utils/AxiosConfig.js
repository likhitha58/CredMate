import axios from "axios";

const token = localStorage.getItem("token");

const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;

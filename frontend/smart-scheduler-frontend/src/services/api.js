import axios from "axios";
import { baseUrl } from "../Config";
// const api = axios.create({baseURL: baseUrl});

// import { useAuth } from "../context/AuthContext";
const Api = axios.create({ baseURL: baseUrl });

Api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (user.token) {
    config.headers.Authorization = `Bearer ${user?.token}`;
  }
  return config;
});

export default Api;
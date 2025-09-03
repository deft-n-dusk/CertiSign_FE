import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2713", // your backend
  withCredentials: true,            // send cookies
});

export default api;

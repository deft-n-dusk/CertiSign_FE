import axios from "axios";

const api = axios.create({
  baseURL: "https://certisign-be.onrender.com", // your backend
  withCredentials: true,            // send cookies
});

export default api;

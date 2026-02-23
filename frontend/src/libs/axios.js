import axios from "axios";
// for production there is no local host so we make dynamic base url
const base_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";
const api = axios.create({
  baseURL: base_URL,
});
export default api;

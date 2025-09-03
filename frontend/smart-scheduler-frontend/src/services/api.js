import axios from "axios";
import { baseUrl } from "../Config";
const api = axios.create({baseURL: baseUrl});
export default api;
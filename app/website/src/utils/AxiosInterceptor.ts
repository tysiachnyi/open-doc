import axios, { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

const url = import.meta.env.VITE_API_URL;
const token = new Cookies().get("TOKEN");
// Set config defaults when creating the instance
console.log("url", url);

export const fetchService = axios.create({
  baseURL: url,
  timeout: 20000, // request timeout
});

// Alter defaults after instance has been created
if (token) {
  fetchService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

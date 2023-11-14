import axios from "axios";

export const api = axios.create({
  // baseURL: 'https://db-desa-app.onrender.com/api/',
  // baseURL: 'http://127.0.0.1:8000/api/',
  baseURL: "http://localhost:3000",
  timeout: 8000,
});

import axios from "axios";

export const api = axios.create({
  // baseURL: 'https://db-desa-app.onrender.com/api/', // Produção
  // baseURL: 'http://127.0.0.1:8000/api/',             // Desenvolvimento antigo
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // Desenvolvimento atual
  timeout: 8000,
});

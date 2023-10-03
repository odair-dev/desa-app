import axios from "axios"

export const api = axios.create({
    // baseURL: 'https://db-desa-app.onrender.com/api/',
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 8000,
})
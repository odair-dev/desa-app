import axios from "axios"

export const api = axios.create({
    baseURL: 'https://db-desa-app.onrender.com/api/',
    timeout: 15000
})
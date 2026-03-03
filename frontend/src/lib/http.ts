import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


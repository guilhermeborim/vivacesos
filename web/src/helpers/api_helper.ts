import axios from "axios";
import { postRefreshToken } from "./backend_helper";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data.errorType === "TOKEN_EXPIRED"
    ) {
      console.log("aqui");
      originalRequest._retry = true;

      try {
        await postRefreshToken();
        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

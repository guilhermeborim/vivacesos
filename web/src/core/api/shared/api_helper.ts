import axios from "axios";
import { postRefreshToken } from "./routes";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      (error.response?.status === 401 &&
        error.response.data.errorType === "TOKEN_EXPIRED") ||
      error.response.data.errorType === "TOKEN_INVALID"
    ) {
      try {
        await postRefreshToken();
        return api.request(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

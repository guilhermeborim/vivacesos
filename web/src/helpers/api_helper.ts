import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { postRefreshToken } from "./backend_helper";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const clinicId = getClinic();
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (clinicId) {
    config.headers["x-clinic-authorization"] = clinicId;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const response = await postRefreshToken();
      console.log(response);
      const newToken = response.data.token;

      saveToken(newToken);
      api.defaults.headers.Authorization = `Bearer ${newToken}`;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export const setAuthTokenHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const runLogoutTimer = (
  logoutCallback: () => void,
  duration: number,
) => {
  setTimeout(() => {
    logoutCallback();
  }, duration);
};

export const checkAutoLogin = (signOut: () => void) => {
  const token = getToken();

  if (!token) {
    signOut();
    return;
  }
  const tokenDecode = jwtDecode<{ exp: number }>(token);
  const expireDate = new Date(tokenDecode.exp * 1000);
  const currentDate = new Date();

  if (currentDate >= expireDate) {
    signOut();
  }

  runLogoutTimer(signOut, expireDate.getTime() - currentDate.getTime());
};

export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
  setAuthTokenHeader(token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
  setAuthTokenHeader(null);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const saveClinic = (clinicId: string) => {
  localStorage.setItem("clinicId", clinicId);
};

export const getClinic = (): string | null => {
  return localStorage.getItem("clinicId");
};

export const removeClinic = () => {
  localStorage.removeItem("clinicId");
};

import { Session } from "context/auth/hooks/authContext";
import {
  LoginHttpParams,
  RegisterHttpParams,
} from "context/auth/interfaces/auth";
import { api } from "./api_helper";
import * as url from "./url_helper";

// Auth Method
export const postLogin = (data: LoginHttpParams) =>
  api.post(url.POST_LOGIN, data);
export const postRegister = (data: RegisterHttpParams) =>
  api.post(url.POST_REGISTER, data);
export const getSession = () => api.get<Session>(url.GET_SESSION);
export const postRefreshToken = () => api.post(url.POST_REFRESH_TOKEN);
export const postLogout = () => api.post(url.POST_LOGOUT);

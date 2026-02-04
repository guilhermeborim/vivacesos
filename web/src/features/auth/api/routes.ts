import { api } from "core/api/shared/api_helper";
import * as url from "core/api/shared/url_helper";
import { Session } from "../hooks/authContext";
import { LoginHttpParams, RegisterHttpParams } from "../interfaces/auth";

// Auth Method
export const postLogin = (data: LoginHttpParams) =>
  api.post(url.POST_LOGIN, data);
export const postRegister = (data: RegisterHttpParams) =>
  api.post(url.POST_REGISTER, data);
export const getSession = () => api.get<Session>(url.GET_SESSION);
export const postRefreshToken = () => api.post(url.POST_REFRESH_TOKEN);
export const postLogout = () => api.post(url.POST_LOGOUT);

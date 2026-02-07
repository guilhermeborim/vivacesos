import { api } from "core/api/shared/api_helper";
import * as url from "core/api/shared/url_helper";
import { Session } from "../hooks/authContext";
import { LoginFormTypeSchema, RegisterFormTypeSchema } from "../schemas";

// Auth Method
export const postLogin = (payload: LoginFormTypeSchema) =>
  api.post(url.POST_LOGIN, payload);
export const postRegister = (payload: RegisterFormTypeSchema) =>
  api.post(url.POST_REGISTER, payload);
export const getSession = () => api.get<Session>(url.GET_SESSION);
export const postRefreshToken = () => api.post(url.POST_REFRESH_TOKEN);
export const postLogout = () => api.post(url.POST_LOGOUT);

import { api } from "@/core/api/shared/api_helper";
import * as url from "@/core/api/shared/url_helper";
import { CreateInviteTypeSchema, UpdateUserTypeSchema } from "../schemas";

export const getUserById = (userId: string) =>
  api.get(url.GET_USER_BY_ID.replace(":userId", userId));
export const getUsersByClinic = () => api.get(url.GET_USERS_BY_CLINIC);
export const putUserById = (userId: string, payload: UpdateUserTypeSchema) =>
  api.put(url.PUT_USER_BY_ID.replace(":userId", userId), payload);

//INVITE
export const postINvite = (payload: CreateInviteTypeSchema) =>
  api.post(url.POST_INVITE, payload);

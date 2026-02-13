import { api } from "@/core/api/shared/api_helper";
import * as url from "@/core/api/shared/url_helper";
import { CreateInviteTypeSchema } from "../schemas";

export const getUserById = (userId: string) =>
  api.get(url.GET_CLINIC_BY_ID.replace(":userId", userId));
export const getUsersByClinic = () => api.get(url.GET_USERS_BY_CLINIC);

//INVITE
export const postINvite = (payload: CreateInviteTypeSchema) =>
  api.post(url.POST_INVITE, payload);

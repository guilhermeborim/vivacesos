import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import {
  CreateInviteTypeSchema,
  UpdateStatusUserSchema,
  UpdateUserTypeSchema,
} from "../schemas"

export const getUserById = (userId: string) =>
  api.get(url.GET_USER_BY_ID.replace(":userId", userId))
export const getUsersByClinic = () => api.get(url.GET_USERS_BY_CLINIC)
export const putUserById = (userId: string, payload: UpdateUserTypeSchema) =>
  api.put(url.PUT_USER_BY_ID.replace(":userId", userId), payload)
export const PatchStatusByUserId = (userId: string, payload: UpdateStatusUserSchema) =>
  api.patch(url.PATCH_STATUS_BY_USER_ID.replace(":userId", userId), payload)
//INVITE
export const postINvite = (payload: CreateInviteTypeSchema) =>
  api.post(url.POST_INVITE, payload)

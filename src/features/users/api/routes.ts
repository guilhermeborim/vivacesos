import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import {
  CreateInviteTypeSchema,
  UpdateStatusUserSchema,
  UpdateUserTypeSchema,
} from "../schemas"

/** `emailSent: false` = convite salvo, mas o e-mail não saiu (use Reenviar). */
export type InviteResult = { id: string; email: string; emailSent: boolean }

export const getUserById = (userId: string) =>
  api.get(url.GET_USER_BY_ID.replace(":userId", userId))
export const getUsersByClinic = () => api.get(url.GET_USERS_BY_CLINIC)
export const putUserById = (userId: string, payload: UpdateUserTypeSchema) =>
  api.put(url.PUT_USER_BY_ID.replace(":userId", userId), payload)
export const PatchStatusByUserId = (userId: string, payload: UpdateStatusUserSchema) =>
  api.patch(url.PATCH_STATUS_BY_USER_ID.replace(":userId", userId), payload)
//INVITE
export const postINvite = (payload: CreateInviteTypeSchema) =>
  api.post<InviteResult>(url.POST_INVITE, payload)
export const postResendInvite = (inviteId: string) =>
  api.post<InviteResult>(url.POST_INVITE_RESEND.replace(":inviteId", inviteId))

import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import { NotificationList } from "@/shared/types"

export const getNotifications = () => api.get<NotificationList>(url.GET_NOTIFICATIONS)

export const patchNotificationRead = (notificationId: string) =>
  api.patch(url.PATCH_NOTIFICATION_READ.replace(":notificationId", notificationId))

export const postReadAllNotifications = () => api.post(url.POST_NOTIFICATIONS_READ_ALL)

export const deleteAllNotifications = () => api.delete(url.DELETE_NOTIFICATIONS)

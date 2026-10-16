import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAllNotifications, patchNotificationRead, postReadAllNotifications } from "./routes"

export const useMutationReadNotification = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (notificationId: string) => patchNotificationRead(notificationId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  })
}

export const useMutationReadAllNotifications = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postReadAllNotifications,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  })
}

/** Apaga todas as notificações do usuário (tela e banco). */
export const useMutationClearNotifications = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  })
}

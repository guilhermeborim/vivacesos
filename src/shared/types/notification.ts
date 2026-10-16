export type NotificationItem = {
  notificationId: string
  type: string
  title: string
  message: string
  /** Rota do front para onde o clique leva. */
  link: string | null
  read: boolean
  createdAt: string
}

export type NotificationList = { unreadCount: number; items: NotificationItem[] }

import {
  useMutationClearNotifications,
  useMutationReadAllNotifications,
  useMutationReadNotification,
} from "@/features/notifications/api/mutations"
import { useQueryNotifications } from "@/features/notifications/api/queries"
import { timeAgo, useNotificationInterval } from "@/features/notifications/hooks"
import { useAuth } from "@/shared/hooks"
import { NotificationItem } from "@/shared/types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap"
import { ButtonPrimitive } from "../Button"
import { ModalComponent } from "../Modal"
import SimpleBar from "simplebar-react"
import { InfoRules } from "../InfoRules"

const typeStyle: Record<string, { icon: string; color: string }> = {
  APPOINTMENT_CREATED: { icon: "ri-calendar-event-line", color: "info" },
  APPOINTMENT_CONFIRMED: { icon: "ri-calendar-check-line", color: "primary" },
  APPOINTMENT_COMPLETED: { icon: "ri-check-double-line", color: "success" },
  APPOINTMENT_CANCELED: { icon: "ri-close-circle-line", color: "danger" },
  APPOINTMENT_NO_SHOW: { icon: "ri-user-unfollow-line", color: "warning" },
  PAYOUT_LAUNCHED: { icon: "ri-hand-coin-line", color: "info" },
  PAYOUT_PAID: { icon: "ri-money-dollar-circle-line", color: "success" },
  INVITE_ACCEPTED: { icon: "ri-user-add-line", color: "success" },
  EXPENSE_DUE: { icon: "ri-time-line", color: "warning" },
  EXPENSE_OVERDUE: { icon: "ri-error-warning-line", color: "danger" },
  INTEGRATION_DISCONNECTED: { icon: "ri-link-unlink-m", color: "danger" },
  EXPENSE_RECURRING_CREATED: { icon: "ri-repeat-line", color: "info" },
}

/** O que cada papel recebe (texto do painel de ajuda). */
const roleRules: Record<string, string[]> = {
  ADMIN: [
    "Repasse lançado ou pago por outra pessoa.",
    "Convite aceito.",
    "Despesa que vence hoje ou venceu (aviso diário às 8h).",
    "Despesa recorrente criada automaticamente.",
    "Google Agenda desconectado (precisa reconectar).",
    "Consulta cancelada e falta registrada.",
  ],
  PROFISSIONAL: [
    "Nova consulta agendada para você.",
    "Consulta sua confirmada.",
    "Repasse seu lançado e repasse seu pago.",
  ],
  RECEPCIONISTA: ["Consulta confirmada.", "Consulta concluída pelo profissional."],
}

export const NotificationDropdown = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { session } = useAuth()
  const { intervalMs } = useNotificationInterval()
  const [confirmClear, setConfirmClear] = useState(false)
  const { notifications } = useQueryNotifications(intervalMs)
  const read = useMutationReadNotification()
  const readAll = useMutationReadAllNotifications()
  const clear = useMutationClearNotifications()

  const unread = notifications?.unreadCount ?? 0
  const items = notifications?.items ?? []

  const handleClick = (n: NotificationItem) => {
    if (!n.read) read.mutate(n.notificationId)
    setOpen(false)
    if (n.link) navigate(n.link)
  }

  return (
    <>
      <Dropdown
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="topbar-head-dropdown ms-1 header-item"
      >
        <DropdownToggle
          type="button"
          tag="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
          aria-label={`Notificações${unread ? `, ${unread} não lidas` : ""}`}
        >
          <i className="bx bx-bell fs-22"></i>
          {unread > 0 && (
            <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="dropdown-head bg-primary bg-pattern rounded-top">
            <div className="p-3 d-flex align-items-center justify-content-between gap-2">
              <h6 className="m-0 fs-16 fw-semibold text-white">Notificações</h6>
              <div className="d-flex gap-1">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  disabled={unread === 0 || readAll.isPending}
                  onClick={() => readAll.mutate()}
                >
                  Marcar como lidas
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  disabled={items.length === 0 || clear.isPending}
                  onClick={() => setConfirmClear(true)}
                >
                  Limpar notificações
                </button>
              </div>
            </div>
          </div>

          <SimpleBar style={{ maxHeight: 320 }}>
            {items.length === 0 ? (
              <p className="text-muted text-center my-4 mx-3">Nenhuma notificação por enquanto.</p>
            ) : (
              items.map((n) => {
                const style = typeStyle[n.type] ?? {
                  icon: "ri-notification-3-line",
                  color: "primary",
                }
                return (
                  <button
                    type="button"
                    key={n.notificationId}
                    onClick={() => handleClick(n)}
                    className={`d-flex w-100 text-start gap-3 border-0 border-bottom px-3 py-2 ${
                      n.read ? "bg-transparent" : "bg-primary-subtle"
                    }`}
                  >
                    <span className={`avatar-xs flex-shrink-0 mt-1`}>
                      <span
                        className={`avatar-title bg-${style.color}-subtle text-${style.color} rounded-circle fs-16`}
                      >
                        <i className={style.icon} />
                      </span>
                    </span>
                    <span className="flex-grow-1">
                      <span
                        className={`d-block fs-13 ${n.read ? "fw-medium" : "fw-semibold"} text-body`}
                      >
                        {n.title}
                      </span>
                      <span className="d-block fs-12 text-muted">{n.message}</span>
                      <span className="d-block fs-11 text-muted mt-1">{timeAgo(n.createdAt)}</span>
                    </span>
                    {!n.read && (
                      <span className="badge bg-danger-subtle text-danger align-self-center">
                        novo
                      </span>
                    )}
                  </button>
                )
              })
            )}
          </SimpleBar>

          <div className="p-3 border-top">
            <InfoRules
              title="O que eu recebo aqui?"
              rules={[
                ...(roleRules[session?.role ?? ""] ?? []),
                "As notificações não trazem conteúdo clínico, só nomes e horários.",
                "A frequência de atualização fica em Configurações.",
              ]}
            />
            <button
              type="button"
              className="btn btn-link btn-sm px-0 mt-1"
              onClick={() => {
                setOpen(false)
                navigate("/settings")
              }}
            >
              Configurar atualização automática
            </button>
          </div>
        </DropdownMenu>
      </Dropdown>

      {confirmClear && (
        <ModalComponent.Root isOpen toggle={() => setConfirmClear(false)}>
          <ModalComponent.Body>
            <h5>Limpar todas as notificações?</h5>
            <p>
              Elas serão apagadas da tela e do banco de dados e não poderão ser recuperadas. Avisos
              futuros continuam chegando normalmente.
            </p>
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <ButtonPrimitive variant="light" onClick={() => setConfirmClear(false)}>
              Voltar
            </ButtonPrimitive>
            <ButtonPrimitive
              variant="danger"
              isLoading={clear.isPending}
              onClick={async () => {
                try {
                  await clear.mutateAsync()
                  setConfirmClear(false)
                } catch {
                  // Mantém o modal aberto para tentar de novo
                }
              }}
            >
              Limpar notificações
            </ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )}
    </>
  )
}

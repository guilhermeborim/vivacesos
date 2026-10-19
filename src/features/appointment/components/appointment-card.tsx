import { ButtonPrimitive, DropdownComponent } from "@/core/ui"
import { AppointmentActions } from "../hooks/use-appointment-actions"
import { AppointmentStatus } from "@/shared/enums"
import { Appointment } from "@/shared/types"
import { formatCurrency } from "@/shared/utils"
import { Badge } from "reactstrap"
import { minutesLabel } from "../utils"

type AgendaAppointment = Appointment["appointment"]

const statusInfo: Record<string, { label: string; color: string; css: string }> = {
  AGENDADA: { label: "Agendada", color: "info", css: "" },
  CONFIRMADA: { label: "Confirmada", color: "primary", css: "" },
  CHEGOU: { label: "Paciente chegou", color: "success", css: "arrived" },
  CONCLUIDA: { label: "Concluída", color: "secondary", css: "done" },
}

const paymentLabel: Record<string, string> = { PIX: "PIX", CARTAO: "Cartão", DINHEIRO: "Dinheiro" }

interface AppointmentCardProps {
  appointment: AgendaAppointment
  start: number
  end: number
  actions: AppointmentActions
  onTriage?: (appointment: AgendaAppointment) => void
}

/** Paciente num horário: situação sempre visível; Chegou/Triagem no hover; o resto no menu. */
export function AppointmentCard({
  appointment,
  start,
  end,
  actions,
  onTriage,
}: AppointmentCardProps) {
  const { changeStatus, sendWhatsapp, edit, setPaying, canPay } = actions
  const id = appointment.appointmentId
  const status = appointment.status
  const info = statusInfo[status] ?? statusInfo.AGENDADA

  const isScheduled = status === AppointmentStatus.AGENDADA
  const isConfirmed = status === AppointmentStatus.CONFIRMADA
  const isArrived = status === AppointmentStatus.CHEGOU
  const isDone = status === AppointmentStatus.CONCLUIDA

  // Botões rápidos (aparecem ao passar o mouse), conforme a situação da consulta.
  const quick: {
    label: string
    icon: string
    variant: "success" | "primary" | "warning" | "danger" | "info"
    run: () => void
  }[] = []
  const go = (to: AppointmentStatus) => () => changeStatus(appointment, to)
  if (isConfirmed) {
    quick.push({
      label: "Chegou",
      icon: "ri-user-follow-line",
      variant: "success",
      run: go(AppointmentStatus.CHEGOU),
    })
  }
  if (isScheduled) {
    quick.push({
      label: "Confirmou",
      icon: "ri-check-double-line",
      variant: "primary",
      run: go(AppointmentStatus.CONFIRMADA),
    })
  }
  if (isArrived && onTriage) {
    quick.push({
      label: "Triagem",
      icon: "ri-heart-pulse-line",
      variant: "info",
      run: () => onTriage(appointment),
    })
  }
  if (isArrived) {
    quick.push({
      label: "Concluir",
      icon: "ri-check-line",
      variant: "primary",
      run: go(AppointmentStatus.CONCLUIDA),
    })
  }
  if (isScheduled || isConfirmed || isArrived) {
    quick.push({
      label: "Cancelou",
      icon: "ri-close-circle-line",
      variant: "danger",
      run: go(AppointmentStatus.CANCELADA),
    })
  }
  if (isConfirmed) {
    quick.push({
      label: "Faltou",
      icon: "ri-user-unfollow-line",
      variant: "warning",
      run: go(AppointmentStatus.FALTOU),
    })
  }

  // Menu ⋯: o que sobra. Valor e pagamento ficam com quem chegou ou já concluiu.
  const canEdit = isScheduled || isConfirmed || isArrived || (isDone && !appointment.paid)
  const canPayNow = canPay && !appointment.payoutId && (isArrived || isDone)
  const hasMenu = canEdit || canPayNow || isScheduled

  return (
    <div className={`agenda-card ${info.css}`}>
      <div className="text-truncate">
        <strong>{appointment.patient.name}</strong>
        <small className="text-muted ms-2">
          {minutesLabel(start)} – {minutesLabel(end)}
        </small>
        <span className="ms-2 fw-medium">{formatCurrency(appointment.price)}</span>
        <div className="mt-1 d-flex flex-wrap gap-1 align-items-center">
          <Badge color={info.color}>
            {isDone && <i className="ri-check-line me-1" />}
            {info.label}
          </Badge>
          {appointment.hasTriage && (
            <Badge color="info" pill>
              <i className="ri-heart-pulse-line me-1" />
              Triagem feita
            </Badge>
          )}
          {appointment.paid ? (
            <Badge color="success" pill>
              Pago{appointment.paymentMethod ? ` · ${paymentLabel[appointment.paymentMethod]}` : ""}
            </Badge>
          ) : (
            (isArrived || isDone) && (
              <Badge color="warning" pill outline>
                Não pago
              </Badge>
            )
          )}
          {appointment.payoutId && (
            <Badge color="secondary" pill outline>
              Repassada
            </Badge>
          )}
        </div>
      </div>

      <div className="d-flex align-items-center gap-1 flex-shrink-0">
        {quick.length > 0 && (
          <div className="agenda-actions">
            {quick.map((q) => (
              <ButtonPrimitive key={q.label} size="sm" variant={q.variant} onClick={q.run}>
                <i className={`${q.icon} me-1`} />
                {q.label}
              </ButtonPrimitive>
            ))}
          </div>
        )}

        {hasMenu && (
          <DropdownComponent.Root>
            <DropdownComponent.Toggle variant="light" aria-label="Mais ações" />
            <DropdownComponent.Menu>
              {canEdit && (
                <DropdownComponent.Item
                  label={isScheduled || isConfirmed ? "Editar" : "Valor"}
                  icon={<i className="mdi mdi-pencil-outline me-1" />}
                  onClick={() => edit.openEdit(id)}
                />
              )}
              {isScheduled && (
                <DropdownComponent.Item
                  label="WhatsApp"
                  icon={<i className="mdi mdi-whatsapp me-1" />}
                  onClick={() => sendWhatsapp(id)}
                />
              )}
              {canPayNow && (
                <DropdownComponent.Item
                  label="Pagamento"
                  icon={<i className="mdi mdi-cash me-1" />}
                  onClick={() => setPaying(appointment)}
                />
              )}
            </DropdownComponent.Menu>
          </DropdownComponent.Root>
        )}
      </div>
    </div>
  )
}

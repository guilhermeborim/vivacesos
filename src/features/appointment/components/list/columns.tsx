import { DropdownComponent, TableList } from "@/core/ui"
import { AppointmentStatus } from "@/shared/enums"
import { Appointment } from "@/shared/types"
import { Badge } from "reactstrap"
import { formatCurrency, formatDateTime } from "@/shared/utils"

interface AppointmentColumnsProps {
  onEdit: (appointmentId: string) => void
  onChangeStatus: (appointmentId: string, status: AppointmentStatus) => void
  onPayment?: (appointment: Appointment) => void
  /** Abre o WhatsApp com a mensagem pronta para o paciente. */
  onWhatsapp?: (appointmentId: string) => void
}

const statusColor: Record<AppointmentStatus, string> = {
  AGENDADA: "info",
  CONFIRMADA: "primary",
  CONCLUIDA: "success",
  CANCELADA: "danger",
  FALTOU: "warning",
}

export function appointmentColumns({
  onEdit,
  onChangeStatus,
  onPayment,
  onWhatsapp,
}: AppointmentColumnsProps) {
  const baseColumns = [
    TableList.Column<Appointment>({
      header: "Paciente",
      accessorFn: (row) => row.appointment.patient.name,
      filterType: "text",
    }),
    TableList.Column<Appointment>({
      header: "Profissional",
      accessorFn: (row) => row.appointment.professional.name,
      filterType: "text",
    }),
    TableList.Column<Appointment>({
      header: "Início",
      accessorFn: (row) => formatDateTime(row.appointment.startsAt),
    }),
    TableList.Column<Appointment>({
      header: "Fim",
      accessorFn: (row) => formatDateTime(row.appointment.endsAt),
    }),
    TableList.Column<Appointment>({
      header: "Valor",
      accessorFn: (row) => formatCurrency(row.appointment.price),
    }),
    TableList.Column<Appointment>({
      header: "Pago",
      accessorFn: (row) => (row.appointment.paid ? "Sim" : "Não"),
      cell: (row) =>
        row.appointment.paid ? (
          <Badge color="success">SIM</Badge>
        ) : (
          <Badge color="danger">NÃO</Badge>
        ),
      filterType: "select",
      options: ["Sim", "Não"],
    }),
    TableList.Column<Appointment>({
      header: "Status",
      accessorFn: (row) => row.appointment.status,
      cell: (row) => (
        <Badge color={statusColor[row.appointment.status]}>{row.appointment.status}</Badge>
      ),
      filterType: "select",
      options: Object.values(AppointmentStatus),
    }),
  ]

  return TableList.Columns<Appointment>({
    columns: baseColumns,
    renderActions: (row) => {
      const { appointment } = row
      const isOpen =
        appointment.status === AppointmentStatus.AGENDADA ||
        appointment.status === AppointmentStatus.CONFIRMADA
      const isDone = appointment.status === AppointmentStatus.CONCLUIDA
      if (!isOpen && !isDone) return null
      // Concluída e paga sem ação de pagamento disponível: o menu ficaria vazio.
      if (isDone && appointment.paid && (!onPayment || appointment.payoutId)) return null

      const id = appointment.appointmentId
      return (
        <>
          {/* Concluída e paga: o valor está fechado (nada a editar). */}
          {!(isDone && appointment.paid) && (
            <DropdownComponent.Item
              label={isDone ? "Valor" : "Editar"}
              icon={<i className="mdi mdi-pencil-outline me-1" />}
              onClick={() => onEdit(id)}
            />
          )}
          {onWhatsapp && isOpen && (
            <DropdownComponent.Item
              label="Enviar no WhatsApp"
              icon={<i className="mdi mdi-whatsapp me-1" />}
              onClick={() => onWhatsapp(id)}
            />
          )}
          {onPayment && !appointment.payoutId && (
            <DropdownComponent.Item
              label="Pagamento"
              icon={<i className="mdi mdi-eye-outline me-1" />}
              onClick={() => onPayment(row)}
            />
          )}
          {isOpen && appointment.status === AppointmentStatus.AGENDADA && (
            <DropdownComponent.Item
              label="Confirmar"
              icon={<i className="mdi mdi-eye-outline me-1" />}
              onClick={() => onChangeStatus(id, AppointmentStatus.CONFIRMADA)}
            />
          )}
          {isOpen && (
            <>
              <DropdownComponent.Item
                label="Concluir"
                icon={<i className="mdi mdi-eye-outline me-1" />}
                onClick={() => onChangeStatus(id, AppointmentStatus.CONCLUIDA)}
              />
              <DropdownComponent.Item
                label="Faltou"
                icon={<i className="mdi mdi-eye-off-outline me-1" />}
                onClick={() => onChangeStatus(id, AppointmentStatus.FALTOU)}
              />
              <DropdownComponent.Item
                label="Cancelar"
                variant="danger"
                icon={<i className="mdi mdi-eye-off-outline me-1" />}
                onClick={() => onChangeStatus(id, AppointmentStatus.CANCELADA)}
              />
            </>
          )}
        </>
      )
    },
  })
}

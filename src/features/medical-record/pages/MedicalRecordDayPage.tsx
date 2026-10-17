import { BaseLayout, ButtonPrimitive, DropdownComponent, InfoRules, TableList } from "@/core/ui"
import { ColumnDef } from "@tanstack/react-table"
import { useAuth, useMyProfessional } from "@/shared/hooks"
import { MedicalRecordDayItem } from "@/shared/types"
import { AppointmentStatus } from "@/shared/enums"
import { useMemo } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Badge } from "reactstrap"
import { useQueryMedicalRecordsDay } from "../api/queries"
import { todayRange } from "../utils"

type DayPatient = {
  patient: MedicalRecordDayItem["patient"]
  appointments: MedicalRecordDayItem["appointment"][]
}

const statusColor: Record<AppointmentStatus, string> = {
  AGENDADA: "info",
  CONFIRMADA: "primary",
  CHEGOU: "secondary",
  CONCLUIDA: "success",
  CANCELADA: "danger",
  FALTOU: "warning",
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

/** Um prontuário por paciente, mesmo com várias consultas no dia. */
function groupByPatient(items: MedicalRecordDayItem[]): DayPatient[] {
  const map = new Map<string, DayPatient>()
  for (const item of items) {
    const entry = map.get(item.patient.patientId) ?? {
      patient: item.patient,
      appointments: [],
    }
    entry.appointments.push(item.appointment)
    map.set(item.patient.patientId, entry)
  }
  return [...map.values()]
}

export function MedicalRecordDayPage() {
  const { hasPermission } = useAuth()
  const { isProfessional, isLoading: loadingProfessional } = useMyProfessional()
  const navigate = useNavigate()
  const range = useMemo(todayRange, [])
  const { dataDay } = useQueryMedicalRecordsDay(range)
  // Sala de espera: só quem a recepção já marcou como CHEGOU.
  const patients = useMemo(
    () =>
      groupByPatient(
        (dataDay ?? []).filter((i) => i.appointment.status === AppointmentStatus.CHEGOU),
      ),
    [dataDay],
  )

  // Prontuários são de quem atende: ADMIN sem perfil de profissional não acessa.
  if (!hasPermission("RECORD_VIEW") || (!loadingProfessional && !isProfessional)) {
    return <Navigate to="/error-403" />
  }

  const columns = TableList.Columns<DayPatient>({
    columns: [
      TableList.Column<DayPatient>({
        header: "Paciente",
        accessorFn: (row) => row.patient.name,
        filterType: "text",
      }),
      TableList.Column<DayPatient>({
        header: "Consultas",
        accessorFn: (row) =>
          row.appointments.map((a) => `${formatTime(a.startsAt)} ${a.status}`).join(" "),
        cell: (row) => (
          <div className="d-flex flex-wrap gap-1">
            {row.appointments.map((a) => (
              <Badge key={a.appointmentId} color={statusColor[a.status]}>
                {formatTime(a.startsAt)} · {a.status}
              </Badge>
            ))}
          </div>
        ),
      }),
    ],
  })

  // Ação principal em verde; o resto no menu de três pontinhos.
  const columnsWithActions: ColumnDef<DayPatient>[] = [
    ...columns,
    {
      header: "AÇÃO",
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => {
        const { patient, appointments } = row.original
        const next = appointments.find((a) => a.status === AppointmentStatus.CHEGOU)
        return (
          <div className="d-flex align-items-center gap-2">
            {next && (
              <ButtonPrimitive
                size="sm"
                variant="success"
                onClick={() =>
                  navigate(
                    `/medical-record/${patient.patientId}/new?appointmentId=${next.appointmentId}`,
                  )
                }
              >
                <i className="ri-stethoscope-line me-1" />
                Iniciar atendimento
              </ButtonPrimitive>
            )}
            <DropdownComponent.Root>
              <DropdownComponent.Toggle variant="light" aria-label="Mais ações" />
              <DropdownComponent.Menu>
                <DropdownComponent.Item
                  label="Abrir prontuário"
                  icon={<i className="mdi mdi-eye-outline me-1" />}
                  onClick={() => navigate(`/medical-record/${patient.patientId}`)}
                />
              </DropdownComponent.Menu>
            </DropdownComponent.Root>
          </div>
        )
      },
    },
  ]

  return (
    <BaseLayout.Root title="Sala de Espera" pageTitle="Atendimento">
      <BaseLayout.Header isFilters={false} />
      <BaseLayout.Body>
        <>
          <InfoRules
            rules={[
              <>
                Aparecem aqui os pacientes que <strong>já chegaram hoje</strong> para consulta com
                você (a recepção marca “Chegou” em Agendas).
              </>,
              "Cada paciente aparece uma única vez, mesmo com mais de uma consulta no dia.",
              "“Iniciar atendimento” abre a ficha já com a consulta escolhida: ficha, prescrição, exames, atestados, encaminhamentos e a triagem feita pela recepção.",
              <>
                A ficha só pode ser criada para consulta <strong>confirmada</strong> ou com o
                paciente <strong>presente</strong>, e cada consulta tem uma ficha ativa.
              </>,
              "Uma ficha não pode ser editada nem apagada. Se houver erro, cancele com uma justificativa e crie outra.",
              "Ao concluir uma consulta sem ficha, o sistema avisa antes de concluir.",
              "Toda abertura de prontuário e toda criação ou cancelamento de ficha ficam registradas na auditoria.",
            ]}
          />
          <TableList.Root columns={columnsWithActions} data={patients} />
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

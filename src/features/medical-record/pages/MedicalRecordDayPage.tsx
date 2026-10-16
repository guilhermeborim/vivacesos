import { BaseLayout, DropdownComponent, InfoRules, TableList } from "@/core/ui"
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
  const patients = useMemo(() => groupByPatient(dataDay ?? []), [dataDay])

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
    renderActions: (row) => (
      <DropdownComponent.Item
        label="Abrir prontuário"
        icon={<i className="mdi mdi-eye-outline me-1" />}
        onClick={() => navigate(`/medical-record/${row.patient.patientId}`)}
      />
    ),
  })

  return (
    <BaseLayout.Root title="Prontuários do Dia" pageTitle="Prontuários">
      <BaseLayout.Header isFilters={false} />
      <BaseLayout.Body>
        <>
          <InfoRules
            rules={[
              <>
                Aparecem aqui os pacientes que têm consulta <strong>confirmada hoje</strong> com
                você.
              </>,
              "Cada paciente aparece uma única vez, mesmo com mais de uma consulta no dia.",
              <>
                A ficha só pode ser criada para consulta <strong>confirmada</strong>, e cada
                consulta tem uma ficha ativa. Para complementar, use o <strong>adendo</strong>.
              </>,
              "Uma ficha não pode ser editada nem apagada. Se houver erro, cancele com uma justificativa e crie outra.",
              "Ao concluir uma consulta sem ficha, o sistema avisa antes de concluir.",
              "Toda abertura de prontuário e toda criação ou cancelamento de ficha ficam registradas na auditoria.",
            ]}
          />
          <TableList.Root columns={columns} data={patients} />
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

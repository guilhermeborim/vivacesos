import { BaseLayout, DropdownComponent, InfoRules, TableList } from "@/core/ui"
import { useAuth, useMyProfessional } from "@/shared/hooks"
import { MedicalRecordListItem } from "@/shared/types"
import { formatDate, formatDateTime } from "@/shared/utils"
import { Navigate, useNavigate } from "react-router-dom"
import { useQueryMedicalRecords } from "../api/queries"

export function MedicalRecordListPage() {
  const { hasPermission } = useAuth()
  const { isProfessional, isLoading: loadingProfessional } = useMyProfessional()
  const navigate = useNavigate()
  const { dataRecords } = useQueryMedicalRecords()

  // Prontuários são de quem atende: ADMIN sem perfil de profissional não acessa.
  if (!hasPermission("RECORD_VIEW") || (!loadingProfessional && !isProfessional)) {
    return <Navigate to="/error-403" />
  }

  const columns = TableList.Columns<MedicalRecordListItem>({
    columns: [
      TableList.Column<MedicalRecordListItem>({
        header: "Paciente",
        accessorFn: (row) => row.patient.name,
        filterType: "text",
      }),
      TableList.Column<MedicalRecordListItem>({
        header: "Nascimento",
        accessorFn: (row) => formatDate(String(row.patient.birthDate).slice(0, 10)),
      }),
      TableList.Column<MedicalRecordListItem>({
        header: "Última ficha",
        accessorFn: (row) => (row.lastEntryAt ? formatDateTime(row.lastEntryAt) : "-"),
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
    <BaseLayout.Root title="Todos os Prontuários" pageTitle="Prontuários">
      <BaseLayout.Header />
      <BaseLayout.Body>
        <>
          <InfoRules
            rules={[
              "O prontuário de cada paciente é aberto automaticamente quando o paciente é cadastrado.",
              "Prontuários e fichas têm valor legal: nunca são apagados.",
              "Somente profissionais da clínica (inclusive o ADMIN que também atende) acessam os prontuários.",
              "Aqui estão todos os pacientes da clínica. Para ver só quem tem consulta confirmada hoje, use “Prontuários do Dia”.",
              "Cada abertura de prontuário fica registrada na auditoria.",
            ]}
          />
          <TableList.Root columns={columns} data={dataRecords || []} />
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

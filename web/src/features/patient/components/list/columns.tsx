import { DropdownComponent, TableList } from "@/core/ui"
import { Patient } from "@/shared/types"

interface CreatePatientColumnsProps {
  onEdit: (patientId: string) => void
}

export function createPatientColumns({ onEdit }: CreatePatientColumnsProps) {
  const baseColumns = [
    TableList.Column<Patient>({
      header: "Nome",
      accessorFn: (row) => row.patients.name,
    }),
    TableList.Column<Patient>({
      header: "E-mail",
      accessorFn: (row) => row.patients.email,
    }),
  ]

  return TableList.Columns<Patient>({
    columns: baseColumns,
    renderActions: (patient) => (
      <>
        <DropdownComponent.Item
          label="Editar"
          icon={<i className="mdi mdi-pencil-outline me-1" />}
          onClick={() => onEdit(patient.patients.patientId)}
        />
      </>
    ),
  })
}

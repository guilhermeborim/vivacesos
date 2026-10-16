import { DropdownComponent, TableList } from "@/core/ui"
import { Clinic } from "@/shared/types"
import { Badge } from "reactstrap"

interface ClinicColumnsProps {
  onEdit: (clinicId: string) => void
  onInactive: (clinicId: string) => void
}

export function clinicColumns({ onEdit, onInactive }: ClinicColumnsProps) {
  const baseColumns = [
    TableList.Column<Clinic>({
      header: "Nome",
      accessorFn: (row) => row.clinic.name,
    }),
    TableList.Column<Clinic>({
      header: "Cidade",
      accessorFn: (row) => row.clinic.city,
    }),
    TableList.Column<Clinic>({
      header: "Status",
      accessorFn: (row) => row.status,
      cell: (row) =>
        row.status ? (
          <Badge color="success">ATIVO</Badge>
        ) : (
          <Badge color="danger">INATIVO</Badge>
        ),
    }),
  ]

  return TableList.Columns<Clinic>({
    columns: baseColumns,
    renderActions: (clinic) => (
      <>
        <DropdownComponent.Item
          label="Editar"
          icon={<i className="mdi mdi-pencil-outline me-1" />}
          onClick={() => onEdit(clinic.clinic.clinicId)}
        />
        <DropdownComponent.Item
          label={clinic.status ? "Inativar" : "Ativar"}
          icon={
            <i
              className={`mdi ${clinic.status ? "mdi-eye-off-outline" : "mdi-eye-outline"} me-1`}
            />
          }
          onClick={() => onInactive(clinic.clinic.clinicId)}
        />
      </>
    ),
  })
}

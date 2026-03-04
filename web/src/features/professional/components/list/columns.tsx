import { DropdownComponent, TableList } from "@/core/ui"
import { Professional } from "@/shared/types"

interface ProfessionalColumnsProps {
  onEdit: (professionalId: string) => void
  onInactive: (professional: Professional) => void
}

export function professionalColumns({ onEdit, onInactive }: ProfessionalColumnsProps) {
  const baseColumns = [
    TableList.Column<Professional>({
      header: "Nome",
      accessorFn: (row) => row.professional.name,
    }),
    TableList.Column<Professional>({
      header: "Tipo",
      accessorFn: (row) => row.professional.type,
      options: ["MEDICO"],
      filterType: "select",
    }),
    TableList.Column<Professional>({
      header: "Especialidade",
      accessorFn: (row) => row.professional.specialty,
    }),
    TableList.Column<Professional>({
      header: "Status",
      accessorFn: (row) => (row.professional.active ? "ATIVO" : "INATIVO"),
    }),
  ]

  return TableList.Columns<Professional>({
    columns: baseColumns,
    renderActions: (professional) => (
      <>
        <DropdownComponent.Item
          label="Editar"
          icon={<i className="mdi mdi-pencil-outline me-1" />}
          onClick={() => onEdit(professional.id)}
        />
        <DropdownComponent.Item
          label={professional.professional.active ? "Inativar" : "Ativar"}
          icon={
            <i
              className={`mdi ${professional.professional.active ? "mdi-eye-off-outline" : "mdi-eye-outline"} me-1`}
            />
          }
          variant={professional.professional.active ? "danger" : "success"}
          onClick={() => onInactive(professional)}
        />
      </>
    ),
  })
}

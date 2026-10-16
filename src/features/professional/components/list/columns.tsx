import { DropdownComponent, TableList } from "@/core/ui"
import { Professional } from "@/shared/types"
import { Badge } from "reactstrap"

interface ProfessionalColumnsProps {
  onEdit: (professionalId: string) => void
  onInactive: (professionalId: string) => void
  onAvailability: (professional: Professional) => void
}

export function professionalColumns({
  onEdit,
  onInactive,
  onAvailability,
}: ProfessionalColumnsProps) {
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
      header: "Repasse",
      accessorFn: (row) =>
        row.professional.payoutPercent == null
          ? "-"
          : `${row.professional.payoutPercent.toLocaleString("pt-BR")}%`,
    }),
    TableList.Column<Professional>({
      header: "Status",
      accessorFn: (row) => row.professional.active,
      cell: (row) =>
        row.professional.active ? (
          <Badge color="success">ATIVO</Badge>
        ) : (
          <Badge color="danger">INATIVO</Badge>
        ),
    }),
  ]

  return TableList.Columns<Professional>({
    columns: baseColumns,
    renderActions: (professional) => (
      <>
        <DropdownComponent.Item
          label="Editar"
          icon={<i className="mdi mdi-pencil-outline me-1" />}
          onClick={() => onEdit(professional.professional.professionalId)}
        />
        <DropdownComponent.Item
          label="Horários de atendimento"
          icon={<i className="mdi mdi-clock-outline me-1" />}
          onClick={() => onAvailability(professional)}
        />
        <DropdownComponent.Item
          label={professional.professional.active ? "Inativar" : "Ativar"}
          icon={
            <i
              className={`mdi ${professional.professional.active ? "mdi-eye-off-outline" : "mdi-eye-outline"} me-1`}
            />
          }
          onClick={() => onInactive(professional.professional.professionalId)}
        />
      </>
    ),
  })
}

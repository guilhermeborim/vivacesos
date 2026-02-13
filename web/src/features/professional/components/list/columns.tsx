import { DropdownComponent } from "core/ui";
import { TableList } from "core/ui/components/Table";
import { Professional } from "shared/types";

interface CreateProfessionalColumnsProps {
  onEdit: (professional: Professional) => void;
  onDelete: (professional: Professional) => void;
}

export function createProfessionalColumns({
  onEdit,
  onDelete,
}: CreateProfessionalColumnsProps) {
  const baseColumns = [
    TableList.Column<Professional>({
      header: "Nome",
      accessorFn: (row) => row.name,
    }),
    TableList.Column<Professional>({
      header: "Tipo",
      accessorFn: (row) => row.type,
    }),
    TableList.Column<Professional>({
      header: "Especialidade",
      accessorFn: (row) => row.specialty,
    }),
  ];

  return TableList.Columns<Professional>({
    columns: baseColumns,
    renderActions: (professional) => (
      <>
        <DropdownComponent.Item
          label="Editar"
          icon={<i className="mdi mdi-pencil-outline me-1" />}
          onClick={() => onEdit(professional)}
        />
        <DropdownComponent.Item
          label="Excluir"
          icon={<i className="mdi mdi-delete-outline me-1" />}
          variant="danger"
          onClick={() => onDelete(professional)}
        />
      </>
    ),
  });
}

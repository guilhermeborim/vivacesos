import { TextColumn } from "shared/components";
import { actionsColumn } from "shared/components/ListActionsDropdown";

interface ColumnsListProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function columnsListProfessional({
  onEdit,
  onDelete,
}: ColumnsListProps) {
  return [
    TextColumn("Nome", "name"),
    TextColumn("Tipo", "type"),
    TextColumn("Especialidade", "specialty"),

    actionsColumn((row: any) => [
      {
        label: "Editar",
        icon: <i className="mdi mdi-pencil-outline me-1" />,
        onClick: () => onEdit(row.id),
      },
      {
        label: "Excluir",
        icon: <i className="mdi mdi-delete-outline me-1" />,
        variant: "danger",
        onClick: () => onDelete(row.id),
      },
    ]),
  ];
}

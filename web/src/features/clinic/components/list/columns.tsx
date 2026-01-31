import { TextColumn } from "shared/components";
import { ClinicActionsDropdown } from "./options";

interface ColumnsClinicProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function columnsListClinic({ onEdit, onDelete }: ColumnsClinicProps) {
  return [
    TextColumn("NOME", "clinic.name"),
    TextColumn("CNPJ", "clinic.cnpj"),
    {
      header: "AÇÃO",
      disableFilters: true,
      enableSorting: false,
      cell: ({ row }: any) => (
        <ClinicActionsDropdown
          onEdit={() => onEdit(row.original.clinic.id)}
          onDelete={() => onDelete(row.original.clinic.id)}
        />
      ),
    },
  ];
}

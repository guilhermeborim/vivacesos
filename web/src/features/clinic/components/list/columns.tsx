import { TextColumn } from "shared/components";
import { ClinicActionsDropdown } from "./options";

interface ColumnsClinicProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function columnsListClinic({ onEdit, onDelete }: ColumnsClinicProps) {
  return [
    TextColumn("NOME", "name"),
    TextColumn("CNPJ", "cnpj"),
    TextColumn("STATUS", "status"),
    {
      header: "AÇÃO",
      disableFilters: true,
      enableSorting: false,
      cell: ({ row }: any) => (
        <ClinicActionsDropdown
          onEdit={() => onEdit(row.original.id)}
          onDelete={() => onDelete(row.original.id)}
        />
      ),
    },
  ];
}

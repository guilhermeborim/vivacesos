import { DropdownComponent, TableList } from "@/core/ui";
import { Patient } from "@/shared/types";

interface CreatePatientColumnsProps {
  onEdit: (user: Patient) => void;
  onDelete: (user: Patient) => void;
}

export function createPatientColumns({
  onEdit,
  onDelete,
}: CreatePatientColumnsProps) {
  const baseColumns = [
    TableList.Column<Patient>({
      header: "Nome",
      accessorFn: (row) => row.name,
    }),
    TableList.Column<Patient>({
      header: "E-mail",
      accessorFn: (row) => row.email,
    }),
  ];

  return TableList.Columns<Patient>({
    columns: baseColumns,
    renderActions: (patient) => (
      <>
        <DropdownComponent.Item
          label="Editar"
          icon={<i className="mdi mdi-pencil-outline me-1" />}
          onClick={() => onEdit(patient)}
        />
        <DropdownComponent.Item
          label="Excluir"
          icon={<i className="mdi mdi-delete-outline me-1" />}
          variant="danger"
          onClick={() => onDelete(patient)}
        />
      </>
    ),
  });
}

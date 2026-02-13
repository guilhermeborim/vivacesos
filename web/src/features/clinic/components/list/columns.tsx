import { DropdownComponent } from "core/ui";
import { TableList } from "core/ui/components/Table";
import { Clinic } from "shared/types";

interface CreateClinicColumnsProps {
  onEdit: (clinic: Clinic) => void;
  onDelete: (clinic: Clinic) => void;
}

export function createClinicColumns({
  onEdit,
  onDelete,
}: CreateClinicColumnsProps) {
  const baseColumns = [
    TableList.Column<Clinic>({
      header: "Nome",
      accessorFn: (row) => row.clinic.name,
    }),
    TableList.Column<Clinic>({
      header: "Cidade",
      accessorFn: (row) => row.clinic.city,
    }),
  ];

  return TableList.Columns<Clinic>({
    columns: baseColumns,
    renderActions: (clinic) => (
      <>
        <DropdownComponent.Item
          label="Editar"
          icon={<i className="mdi mdi-pencil-outline me-1" />}
          onClick={() => onEdit(clinic)}
        />
        <DropdownComponent.Item
          label="Excluir"
          icon={<i className="mdi mdi-delete-outline me-1" />}
          variant="danger"
          onClick={() => onDelete(clinic)}
        />
      </>
    ),
  });
}

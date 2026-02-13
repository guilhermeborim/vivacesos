import { DropdownComponent } from "core/ui";
import { TableList } from "core/ui/components/Table";
import { User } from "shared/types";

interface CreateUserColumnsProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function createUserColumns({
  onEdit,
  onDelete,
}: CreateUserColumnsProps) {
  const baseColumns = [
    TableList.Column<User>({
      header: "Nome",
      accessorFn: (row) => row.name,
    }),
    TableList.Column<User>({
      header: "E-mail",
      accessorFn: (row) => row.email,
    }),
  ];

  return TableList.Columns<User>({
    columns: baseColumns,
    renderActions: (user) => (
      <>
        <DropdownComponent.Item
          label="Editar"
          icon={<i className="mdi mdi-pencil-outline me-1" />}
          onClick={() => onEdit(user)}
        />
        <DropdownComponent.Item
          label="Excluir"
          icon={<i className="mdi mdi-delete-outline me-1" />}
          variant="danger"
          onClick={() => onDelete(user)}
        />
      </>
    ),
  });
}

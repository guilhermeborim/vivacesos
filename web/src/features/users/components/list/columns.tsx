import { DropdownComponent, TableList } from "@/core/ui";
import { User } from "@/shared/types";

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
      filterType: "text",
    }),
    TableList.Column<User>({
      header: "E-mail",
      accessorFn: (row) => row.email,
      filterType: "text",
    }),
    TableList.Column<User>({
      header: "Status",
      accessorFn: (row) => row.status,
      filterType: "select",
      options: ["Ativo", "Inativo"],
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

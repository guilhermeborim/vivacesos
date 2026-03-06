import { DropdownComponent, TableList } from "@/core/ui"
import { User } from "@/shared/types"
import { Badge } from "reactstrap"

interface UserColumnsProps {
  onEdit: (userId: string) => void
  onInactive: (userId: string) => void
}

export function userColumns({ onEdit, onInactive }: UserColumnsProps) {
  const baseColumns = [
    TableList.Column<User>({
      header: "Nome",
      accessorFn: (row) => row.user.name,
      filterType: "text",
    }),
    TableList.Column<User>({
      header: "E-mail",
      accessorFn: (row) => row.user.email,
      filterType: "text",
    }),
    TableList.Column<User>({
      header: "Cargo",
      accessorFn: (row) => row.role,
      filterType: "text",
    }),
    TableList.Column<User>({
      header: "Status",
      accessorFn: (row) => row.status,
      cell: (row) => <Badge color="success">{row.status}</Badge>,
      filterType: "select",
      options: ["Ativo", "Inativo"],
    }),
  ]

  return TableList.Columns<User>({
    columns: baseColumns,
    renderActions: (user) => (
      <>
        <DropdownComponent.Item
          label="Editar"
          icon={<i className="mdi mdi-pencil-outline me-1" />}
          onClick={() => onEdit(user.user.userId)}
        />
        <DropdownComponent.Item
          label={user.status}
          icon={
            <i
              className={`mdi ${user.status ? "mdi-eye-off-outline" : "mdi-eye-outline"} me-1`}
            />
          }
          variant="danger"
          onClick={() => onInactive(user.user.userId)}
        />
      </>
    ),
  })
}

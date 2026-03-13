import { DropdownComponent, TableList } from "@/core/ui"
import { ClinicUserStatus } from "@/shared/enums"
import { User } from "@/shared/types"
import { Badge } from "reactstrap"

interface UserColumnsProps {
  onEdit: (userId: string) => void
  onInactive: (userId: string) => void
  onBlock?: (userId: string) => void
  isAdmin?: boolean
  currentUserId: string
}

type ColorStatus = "success" | "info" | "danger"

export function userColumns({ onEdit, onInactive, currentUserId }: UserColumnsProps) {
  const statusMap: Record<ClinicUserStatus, ColorStatus> = {
    INVITADO: "info",
    ATIVO: "success",
    BLOQUEADO: "danger",
    INATIVO: "danger",
  }

  const baseColumns = [
    TableList.Column<User>({
      header: "Nome",
      accessorFn: (row) => (row.user ? row.user.name : null),
      filterType: "text",
    }),
    TableList.Column<User>({
      header: "E-mail",
      accessorFn: (row) => (row.user ? row.user.email : row.invite.email),
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
      cell: (row) => <Badge color={statusMap[row.status]}>{row.status}</Badge>,
      filterType: "select",
      options: ["Ativo", "Inativo"],
    }),
  ]

  return TableList.Columns<User>({
    columns: baseColumns,
    renderActions: (user) => {
      const isAtivo = user.status === ClinicUserStatus.ATIVO
      const isInativo = user.status === ClinicUserStatus.INATIVO
      const isBloqueado = user.status === ClinicUserStatus.BLOQUEADO
      const isInvitado = user.status === ClinicUserStatus.INVITADO
      const isSelf = user.user?.userId === currentUserId

      return (
        <>
          {!isInvitado && (
            <DropdownComponent.Item
              label="Editar"
              icon={<i className="mdi mdi-pencil-outline me-1" />}
              onClick={() => onEdit(user.user.userId)}
            />
          )}
          {(isAtivo || isInvitado) && !isSelf && (
            <DropdownComponent.Item
              label="Inativar"
              icon={<i className="mdi mdi-eye-off-outline me-1" />}
              variant="danger"
              onClick={() => onInactive(user.user?.userId ?? user.invite?.email)}
            />
          )}

          {/* Ativar: INATIVO ou BLOQUEADO */}
          {(isInativo || isBloqueado) && !isSelf && (
            <DropdownComponent.Item
              label="Ativar"
              icon={<i className="mdi mdi-eye-outline me-1" />}
              onClick={() => onInactive(user.user!.userId)}
            />
          )}

          {/* {isAtivo && isAdmin && !isSelf && (
            <DropdownComponent.Item
              label="Bloquear"
              icon={<i className="mdi mdi-lock-outline me-1" />}
              variant="danger"
              onClick={() => onBlock(user.user!.userId)}
            />
          )} */}
        </>
      )
    },
  })
}

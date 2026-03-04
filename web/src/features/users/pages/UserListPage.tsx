import { BaseLayout, ButtonPrimitive } from "@/core/ui"
import { TableProvider } from "@/core/ui/components/Table/TableContext"
import { ListUser, ModalInviteUser } from "../components"
import { useInviteUser } from "../hooks"

export function UserListPage() {
  const { modalInvite, toggleModalInvite, formUser, onSubmitInvite } = useInviteUser()

  return (
    <>
      <TableProvider>
        <BaseLayout.Root title="Acessos" pageTitle="Administração">
          <BaseLayout.Header>
            <ButtonPrimitive variant="primary" onClick={toggleModalInvite}>
              Convidar
            </ButtonPrimitive>
          </BaseLayout.Header>
          <BaseLayout.Body>
            <ListUser />
          </BaseLayout.Body>
        </BaseLayout.Root>
      </TableProvider>

      {modalInvite && (
        <ModalInviteUser
          isOpen={modalInvite}
          toggle={toggleModalInvite}
          formUser={formUser}
          onSubmitInvite={onSubmitInvite}
        />
      )}
    </>
  )
}

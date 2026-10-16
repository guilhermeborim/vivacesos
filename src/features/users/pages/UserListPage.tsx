import { BaseLayout, ButtonPrimitive, FormModal } from "@/core/ui"
import { TableProvider } from "@/core/ui/components/Table/TableContext"
import { useFormModal } from "@/shared/hooks"
import { useMutationInvite } from "../api/mutations"
import { FormUser } from "../components/form/form"
import { ListUser } from "../components/list/list"
import { createInviteSchema, CreateInviteTypeSchema } from "../schemas"

export function UserListPage() {
  const mutation = useMutationInvite()
  const invite = useFormModal<CreateInviteTypeSchema>(
    createInviteSchema,
    mutation.mutateAsync,
  )

  return (
    <>
      <TableProvider>
        <BaseLayout.Root title="Acessos" pageTitle="Administração">
          <BaseLayout.Header>
            <ButtonPrimitive variant="primary" onClick={invite.toggleModal}>
              Convidar
            </ButtonPrimitive>
          </BaseLayout.Header>
          <BaseLayout.Body>
            <ListUser />
          </BaseLayout.Body>
        </BaseLayout.Root>
      </TableProvider>

      {invite.modalOpen && (
        <FormModal
          size="lg"
          submitLabel="Convidar"
          isOpen={invite.modalOpen}
          toggle={invite.toggleModal}
          form={invite.form}
          onSubmit={invite.handleSubmit}
          isPending={mutation.isPending}
        >
          <div className="mb-4">
            <h6>
              Este convite tem duração de 24 horas, após isso é necessário um novo
              convite.
            </h6>
          </div>
          <FormUser />
        </FormModal>
      )}
    </>
  )
}

import { BaseLayout, ButtonPrimitive, FormModal, InfoRules } from "@/core/ui"
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
            <>
              <InfoRules
                rules={[
                  "Somente o ADMIN convida usuários e inativa ou reativa acessos.",
                  "O convite é enviado por e-mail e vale por 24 horas. Na coluna “Convite” você vê quanto tempo falta; se expirar, use “Reenviar convite” para gerar um novo link.",
                  "O usuário convidado se cadastra pelo link do convite, usando o mesmo e-mail.",
                  "O papel define o que a pessoa acessa: ADMIN gerencia a clínica, o financeiro e a auditoria; PROFISSIONAL atende e acessa prontuários; RECEPCIONISTA cuida da recepção e do financeiro, sem acesso a prontuários.",
                  "Convidado como PROFISSIONAL, a pessoa informa CRM e especialidade ao aceitar e o perfil é criado sozinho. Convidado como ADMIN, ela pode marcar “Também atendo pacientes” no cadastro.",
                  "Usuário inativo perde o acesso ao sistema; se for profissional, ele também é inativado.",
                ]}
              />
              <ListUser />
            </>
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
              Este convite será enviado por e-mail e tem duração de 24 horas. Após isso
              é necessário reenviá-lo.
            </h6>
          </div>
          <FormUser />
        </FormModal>
      )}
    </>
  )
}

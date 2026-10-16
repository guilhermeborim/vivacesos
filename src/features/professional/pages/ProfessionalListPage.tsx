import { BaseLayout, ButtonPrimitive, FormModal, InfoRules } from "@/core/ui"
import { useFormModal } from "@/shared/hooks"
import { toast } from "react-toastify"
import { useMutationCreateProfessional } from "../api/mutations"
import { FormProfessional } from "../components/form/form"
import { ListProfessional } from "../components/list/list"
import { useListProfessionals } from "../hooks/use-list-professionals"
import { createProfessionalSchema, CreateProfessionalTypeSchema } from "../schemas"

export function ProfessionalListPage() {
  const mutation = useMutationCreateProfessional()
  const create = useFormModal<CreateProfessionalTypeSchema>(
    createProfessionalSchema,
    mutation.mutateAsync,
    () => toast.error("Erro ao criar profissional!"),
  )
  const {
    data: { usersNotProfessionals },
  } = useListProfessionals()

  return (
    <>
      <BaseLayout.Root title="Profissionais da Saúde" pageTitle="Administração">
        <BaseLayout.Header>
          <ButtonPrimitive
            variant="primary"
            onClick={create.toggleModal}
            disabled={usersNotProfessionals?.length === 0}
          >
            Vincular
          </ButtonPrimitive>
        </BaseLayout.Header>
        <BaseLayout.Body>
          <>
            <InfoRules
              rules={[
                "Quem atende pacientes, inclusive o ADMIN que também é médico, precisa estar cadastrado aqui como profissional ativo.",
                "É o cadastro de profissional que permite ter consultas agendadas e acessar os prontuários.",
                "Quem é convidado como PROFISSIONAL informa CRM e especialidade ao aceitar o convite e já aparece aqui. O botão “Vincular” serve para quem já tem acesso e ainda não tem perfil (por exemplo, o ADMIN que atende).",
                "O CRM não pode se repetir na mesma clínica.",
                "Cada profissional define seus horários de atendimento em Configurações → Minha agenda; o ADMIN também pode ajustar pela ação “Horários de atendimento”. Sem horários definidos, atende em qualquer horário.",
                "Inativar o acesso do usuário também inativa o profissional.",
              ]}
            />
            <ListProfessional />
          </>
        </BaseLayout.Body>
      </BaseLayout.Root>
      {create.modalOpen && (
        <FormModal
          size="lg"
          submitLabel="Vincular"
          isOpen={create.modalOpen}
          toggle={create.toggleModal}
          form={create.form}
          onSubmit={create.handleSubmit}
          isPending={mutation.isPending}
        >
          <FormProfessional users={usersNotProfessionals} />
        </FormModal>
      )}
    </>
  )
}

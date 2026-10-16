import { BaseLayout, ButtonPrimitive, FormModal } from "@/core/ui"
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
          <ListProfessional />
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

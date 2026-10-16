import { BaseLayout, ButtonPrimitive, FormModal } from "@/core/ui"
import { useFormModal } from "@/shared/hooks"
import { useMutationPatient } from "../api/mutations"
import { FormPatient } from "../components/form/form"
import { ListPatient } from "../components/list/list"
import { createPatientTypeSchema, CreatePatientTypeSchema } from "../schemas"

export function PatientListPage() {
  const mutation = useMutationPatient()
  const create = useFormModal<CreatePatientTypeSchema>(
    createPatientTypeSchema,
    mutation.mutateAsync,
  )

  return (
    <>
      <BaseLayout.Root title="Pacientes" pageTitle="Recepção">
        <BaseLayout.Header>
          <ButtonPrimitive variant="primary" onClick={create.toggleModal}>
            Cadastrar
          </ButtonPrimitive>
        </BaseLayout.Header>
        <BaseLayout.Body>
          <ListPatient />
        </BaseLayout.Body>
      </BaseLayout.Root>

      {create.modalOpen && (
        <FormModal
          size="xl"
          title="Cadastro de Pacientes"
          submitLabel="Salvar"
          isOpen={create.modalOpen}
          toggle={create.toggleModal}
          form={create.form}
          onSubmit={create.handleSubmit}
          isPending={mutation.isPending}
        >
          <FormPatient />
        </FormModal>
      )}
    </>
  )
}

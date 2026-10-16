import { BaseLayout, ButtonPrimitive, FormModal } from "@/core/ui"
import { useFormModal } from "@/shared/hooks"
import { useMutationAppointment } from "../api/mutations"
import { FormAppointment } from "../components/form/form"
import { ListAppointment } from "../components/list/list"
import { createAppointmentSchema, CreateAppointmentTypeSchema } from "../schemas"

export function AppointmentListPage() {
  const mutation = useMutationAppointment()
  const create = useFormModal<CreateAppointmentTypeSchema>(
    createAppointmentSchema,
    mutation.mutateAsync,
  )

  return (
    <>
      <BaseLayout.Root title="Consultas" pageTitle="Recepção">
        <BaseLayout.Header>
          <ButtonPrimitive variant="primary" onClick={create.toggleModal}>
            Agendar
          </ButtonPrimitive>
        </BaseLayout.Header>
        <BaseLayout.Body>
          <ListAppointment />
        </BaseLayout.Body>
      </BaseLayout.Root>

      {create.modalOpen && (
        <FormModal
          size="lg"
          title="Agendar consulta"
          submitLabel="Agendar"
          isOpen={create.modalOpen}
          toggle={create.toggleModal}
          form={create.form}
          onSubmit={create.handleSubmit}
          isPending={mutation.isPending}
        >
          <FormAppointment />
        </FormModal>
      )}
    </>
  )
}

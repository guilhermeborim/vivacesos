import { BaseLayout, ButtonPrimitive } from "@/core/ui"
import { ListPatient, ModalCreatePatient } from "../components"
import { useCreatePatient } from "../hooks"

export function PatientListPage() {
  const {
    actions: { formCreatePatient, handleSubmitPatient, toggleModal },
    data: { modal },
    isLoading: { isPending },
  } = useCreatePatient()

  return (
    <>
      <BaseLayout.Root title="Pacientes" pageTitle="Recepção">
        <BaseLayout.Header>
          <ButtonPrimitive variant="primary" onClick={toggleModal}>
            Cadastrar
          </ButtonPrimitive>
        </BaseLayout.Header>
        <BaseLayout.Body>
          <ListPatient />
        </BaseLayout.Body>
      </BaseLayout.Root>

      {modal && (
        <ModalCreatePatient
          isOpen={modal}
          toggle={toggleModal}
          formPatient={formCreatePatient}
          handleSubmitPatient={handleSubmitPatient}
          isPending={isPending}
        />
      )}
    </>
  )
}

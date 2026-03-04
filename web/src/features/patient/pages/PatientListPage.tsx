import { BaseLayout, ButtonPrimitive } from "@/core/ui"
import { ListPatient, ModalCreatePatient } from "../components"
import { usePostPatient } from "../hooks"

export function PatientListPage() {
  const { formPatient, onSubmitPatient, modal, toggleModal } = usePostPatient()

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
          formPatient={formPatient}
          onSubmitPatient={onSubmitPatient}
        />
      )}
    </>
  )
}

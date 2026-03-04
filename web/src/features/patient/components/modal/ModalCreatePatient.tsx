import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { FormPatient } from "../form"

interface ModalCreatePatientProps {
  isOpen: boolean
  toggle: () => void
  formPatient: any
  onSubmitPatient: (data: any) => void
}

export function ModalCreatePatient({
  isOpen,
  toggle,
  formPatient,
  onSubmitPatient,
}: ModalCreatePatientProps) {
  return (
    <ModalComponent.Root isOpen={isOpen} toggle={toggle} size="xl">
      <ModalComponent.Header>Cadastro de Pacientes</ModalComponent.Header>
      <ModalComponent.Body>
        <FormPatient formPatient={formPatient} />
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <ButtonPrimitive
          variant="primary"
          onClick={formPatient.handleSubmit(onSubmitPatient)}
        >
          Salvar
        </ButtonPrimitive>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { FormProfessional } from "../form"

interface ModalEditProfessionalProps {
  isOpen: boolean
  toggle: () => void
  formUpdateProfessional: any
  professional: any
  onSubmitUpdate: (data: any) => void
}

export function ModalEditProfessional({
  isOpen,
  toggle,
  formUpdateProfessional,
  professional,
  onSubmitUpdate,
}: ModalEditProfessionalProps) {
  return (
    <ModalComponent.Root isOpen={isOpen} toggle={toggle}>
      <ModalComponent.Body>
        <h5>Atualize os dados do profissional</h5>
        <div className="p-4">
          <FormProfessional
            formProfessional={formUpdateProfessional}
            defaultValues={professional}
            users={[]}
            isEdit
          />
        </div>
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <form onSubmit={formUpdateProfessional.handleSubmit(onSubmitUpdate)}>
          <ButtonPrimitive variant="info">Atualizar</ButtonPrimitive>
        </form>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

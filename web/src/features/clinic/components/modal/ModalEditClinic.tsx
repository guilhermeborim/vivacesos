import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { FormClinic } from "../form"

interface ModalEditClinicProps {
  isOpen: boolean
  toggle: () => void
  formUpdateClinic: any
  clinic: any
  onSubmitClinicUpdate: (data: any) => void
}

export function ModalEditClinic({
  isOpen,
  toggle,
  formUpdateClinic,
  clinic,
  onSubmitClinicUpdate,
}: ModalEditClinicProps) {
  return (
    <ModalComponent.Root isOpen={isOpen} toggle={toggle} size="xl">
      <ModalComponent.Body>
        <h5>Atualize os dados da clínica</h5>
        <div className="p-4">
          <FormClinic formClinic={formUpdateClinic} defaultValues={clinic} />
        </div>
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <form onSubmit={formUpdateClinic.handleSubmit(onSubmitClinicUpdate)}>
          <ButtonPrimitive variant="success">Atualizar</ButtonPrimitive>
        </form>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

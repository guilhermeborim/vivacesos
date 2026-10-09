import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { FormClinic } from "@/shared/forms/clinic"
import { UpdateClinicFormTypeSchema } from "@/shared/schemas"
import { Clinic } from "@/shared/types"
import { UseFormReturn } from "react-hook-form"

interface ModalEditClinicProps {
  isOpen: boolean
  toggle: () => void
  formUpdateClinic: UseFormReturn<UpdateClinicFormTypeSchema>
  clinic: Clinic
  handleSubmitUpdate: (e: React.BaseSyntheticEvent) => void
  isPending: boolean
}

export function ModalEditClinic({
  isOpen,
  toggle,
  formUpdateClinic,
  clinic,
  handleSubmitUpdate,
  isPending,
}: ModalEditClinicProps) {
  return (
    <ModalComponent.Root isOpen={isOpen} toggle={toggle} size="xl">
      <ModalComponent.Body>
        <h5>Atualize os dados da Clínica</h5>
        <div className="p-4">
          <FormClinic defaultValues={clinic} formClinic={formUpdateClinic} />
        </div>
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <form onSubmit={handleSubmitUpdate}>
          <ButtonPrimitive variant="info" isLoading={isPending}>
            Atualizar
          </ButtonPrimitive>
        </form>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

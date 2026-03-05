import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { Professional } from "@/shared/types"
import { FormProvider, UseFormReturn } from "react-hook-form"
import { UpdateProfessionalTypeSchema } from "../../schemas"
import { FormProfessional } from "../form"

interface ModalEditProfessionalProps {
  isOpen: boolean
  toggle: () => void
  formUpdateProfessional: UseFormReturn<UpdateProfessionalTypeSchema>
  professional: Professional
  onSubmitUpdate: (e: React.BaseSyntheticEvent) => void
  isPending: boolean
}

export function ModalEditProfessional({
  isOpen,
  toggle,
  formUpdateProfessional,
  professional,
  onSubmitUpdate,
  isPending,
}: ModalEditProfessionalProps) {
  return (
    <FormProvider {...formUpdateProfessional}>
      <ModalComponent.Root isOpen={isOpen} toggle={toggle}>
        <ModalComponent.Body>
          <h5>Atualize os dados do profissional</h5>
          <div className="p-4">
            <FormProfessional defaultValues={professional} isEdit />
          </div>
        </ModalComponent.Body>
        <ModalComponent.Footer>
          <form onSubmit={onSubmitUpdate}>
            <ButtonPrimitive variant="info" isLoading={isPending}>
              Atualizar
            </ButtonPrimitive>
          </form>
        </ModalComponent.Footer>
      </ModalComponent.Root>
    </FormProvider>
  )
}

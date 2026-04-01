import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { Patient } from "@/shared/types"
import { FormProvider, UseFormReturn } from "react-hook-form"
import { UpdatePatientTypeSchema } from "../../schemas"
import { FormPatient } from "../form"

interface ModalEditPatientProps {
  isOpen: boolean
  toggle: () => void
  formUpdatePatient: UseFormReturn<UpdatePatientTypeSchema>
  patient: Patient
  onSubmitUpdate: (e: React.BaseSyntheticEvent) => void
  isPending: boolean
}

export function ModalEditPatient({
  isOpen,
  toggle,
  formUpdatePatient,
  patient,
  onSubmitUpdate,
  isPending,
}: ModalEditPatientProps) {
  return (
    <FormProvider {...formUpdatePatient}>
      <ModalComponent.Root isOpen={isOpen} toggle={toggle} size="xl">
        <ModalComponent.Header>Atualizar dados do paciente</ModalComponent.Header>
        <ModalComponent.Body>
          <FormPatient defaultValues={patient} />
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

import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { BaseSyntheticEvent } from "react"
import { FormProvider, UseFormReturn } from "react-hook-form"
import { CreatePatientTypeSchema } from "../../schemas"
import { FormPatient } from "../form"

interface ModalCreatePatientProps {
  isOpen: boolean
  toggle: () => void
  formPatient: UseFormReturn<CreatePatientTypeSchema>
  handleSubmitPatient: (e: BaseSyntheticEvent) => void
  isPending: boolean
}

export function ModalCreatePatient({
  isOpen,
  toggle,
  formPatient,
  handleSubmitPatient,
  isPending,
}: ModalCreatePatientProps) {
  return (
    <FormProvider {...formPatient}>
      <ModalComponent.Root isOpen={isOpen} toggle={toggle} size="xl">
        <ModalComponent.Header>Cadastro de Pacientes</ModalComponent.Header>
        <ModalComponent.Body>
          <FormPatient />
        </ModalComponent.Body>
        <ModalComponent.Footer>
          <form onSubmit={handleSubmitPatient}>
            <ButtonPrimitive
              type="submit"
              disabled={!formPatient.formState.isValid}
              isLoading={isPending}
            >
              Salvar
            </ButtonPrimitive>
          </form>
        </ModalComponent.Footer>
      </ModalComponent.Root>
    </FormProvider>
  )
}

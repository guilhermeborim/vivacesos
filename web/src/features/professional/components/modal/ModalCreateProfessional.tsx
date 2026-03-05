import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { User } from "@/shared/types"
import { FormProvider, UseFormReturn } from "react-hook-form"
import { CreateProfessionalTypeSchema } from "../../schemas"
import { FormProfessional } from "../form"

interface ModalCreateProfessionalProps {
  isOpen: boolean
  toggle: () => void
  formCreateProfessional: UseFormReturn<CreateProfessionalTypeSchema>
  usersNotProfessionals: User[]
  onSubmitCreate: (e: React.BaseSyntheticEvent) => void
  isPending: boolean
}

export function ModalCreateProfessional({
  isOpen,
  toggle,
  formCreateProfessional,
  usersNotProfessionals,
  onSubmitCreate,
  isPending,
}: ModalCreateProfessionalProps) {
  return (
    <FormProvider {...formCreateProfessional}>
      <ModalComponent.Root isOpen={isOpen} toggle={toggle} size="lg">
        <ModalComponent.Body>
          <FormProfessional users={usersNotProfessionals} />
        </ModalComponent.Body>
        <ModalComponent.Footer>
          <form onSubmit={onSubmitCreate}>
            <ButtonPrimitive
              className="mt-3"
              type="submit"
              disabled={!formCreateProfessional.formState.isValid}
              isLoading={isPending}
            >
              Vincular
            </ButtonPrimitive>
          </form>
        </ModalComponent.Footer>
      </ModalComponent.Root>
    </FormProvider>
  )
}

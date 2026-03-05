import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { FormProvider, UseFormReturn } from "react-hook-form"
import { CreateInviteTypeSchema } from "../../schemas"
import { FormUser } from "../form"

interface ModalInviteUserProps {
  isOpen: boolean
  toggle: () => void
  formInviteUser: UseFormReturn<CreateInviteTypeSchema>
  handleSubmitInvite: (e: React.BaseSyntheticEvent) => void
  isPending: boolean
}

export function ModalInviteUser({
  isOpen,
  toggle,
  formInviteUser,
  handleSubmitInvite,
  isPending,
}: ModalInviteUserProps) {
  return (
    <FormProvider {...formInviteUser}>
      <ModalComponent.Root isOpen={isOpen} toggle={toggle} size="lg">
        <ModalComponent.Body>
          <div className="mb-4">
            <h6>
              Este convite tem duração de 24 horas, após isso é necessário um novo
              convite.
            </h6>
          </div>
          <FormUser />
        </ModalComponent.Body>
        <ModalComponent.Footer>
          <form onSubmit={handleSubmitInvite}>
            <ButtonPrimitive
              type="submit"
              className="mt-3"
              isLoading={isPending}
              disabled={!formInviteUser.formState.isValid}
            >
              Convidar
            </ButtonPrimitive>
          </form>
        </ModalComponent.Footer>
      </ModalComponent.Root>
    </FormProvider>
  )
}

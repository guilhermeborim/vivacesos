import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { User } from "@/shared/types"
import { FormProfessional } from "../form"

interface ModalCreateProfessionalProps {
  isOpen: boolean
  toggle: () => void
  form: any
  usersNotProfessionals: User[]
  handleSubmit: (data: any) => void
  isPending: boolean
}

export function ModalCreateProfessional({
  isOpen,
  toggle,
  form,
  usersNotProfessionals,
  handleSubmit,
  isPending,
}: ModalCreateProfessionalProps) {
  return (
    <ModalComponent.Root isOpen={isOpen} toggle={toggle} size="lg">
      <ModalComponent.Body>
        <FormProfessional formProfessional={form} users={usersNotProfessionals} />
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <ButtonPrimitive
          variant="primary"
          className="mt-3"
          onClick={form.handleSubmit(handleSubmit)}
          disabled={!form.formState.isValid}
          isLoading={isPending}
        >
          Vincular
        </ButtonPrimitive>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

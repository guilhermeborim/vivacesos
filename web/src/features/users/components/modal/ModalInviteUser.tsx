import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { FormUser } from "../form"

interface ModalInviteUserProps {
  isOpen: boolean
  toggle: () => void
  formUser: any
  onSubmitInvite: (data: any) => void
}

export function ModalInviteUser({
  isOpen,
  toggle,
  formUser,
  onSubmitInvite,
}: ModalInviteUserProps) {
  return (
    <ModalComponent.Root isOpen={isOpen} toggle={toggle} size="lg">
      <ModalComponent.Body>
        <div className="mb-4">
          <h6>
            Este convite tem duração de 24 horas, após isso é necessário
            um novo convite.
          </h6>
        </div>
        <FormUser formUser={formUser} />
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <ButtonPrimitive
          onClick={formUser.handleSubmit(onSubmitInvite)}
          className="mt-3"
        >
          Convidar
        </ButtonPrimitive>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

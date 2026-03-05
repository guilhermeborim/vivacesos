import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { User } from "@/shared/types"
import { FormProvider, UseFormReturn } from "react-hook-form"
import { UpdateUserTypeSchema } from "../../schemas"
import { FormUser } from "../form"

interface ModalEditUserProps {
  isOpen: boolean
  toggle: () => void
  formUpdateUser: UseFormReturn<UpdateUserTypeSchema>
  user: User
  onSubmitUpdate: (e: React.BaseSyntheticEvent) => void
  isPending: boolean
}

export function ModalEditUser({
  isOpen,
  toggle,
  formUpdateUser,
  user,
  onSubmitUpdate,
  isPending,
}: ModalEditUserProps) {
  return (
    <FormProvider {...formUpdateUser}>
      <ModalComponent.Root isOpen={isOpen} toggle={toggle}>
        <ModalComponent.Body>
          <h5>Atualize os dados do usuário</h5>
          <div className="p-4">
            <FormUser defaultValues={user} isEdit />
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

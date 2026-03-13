import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { ClinicUserStatus } from "@/shared/enums"
import { User } from "@/shared/types"

interface ModalStatusUserProps {
  isOpen: boolean
  toggle: () => void
  user: User
  handleSubmitStatus: (data: { status: ClinicUserStatus }) => void
  isPending: boolean
}

export function ModalStatusUser({
  isOpen,
  toggle,
  user,
  handleSubmitStatus,
  isPending,
}: ModalStatusUserProps) {
  return (
    <ModalComponent.Root isOpen={isOpen} toggle={toggle}>
      <ModalComponent.Body>
        <h5>
          Tem certeza que deseja{" "}
          {user.status === ClinicUserStatus.ATIVO ? "Inativar" : "Ativar"} este usuário?
        </h5>
        <p>
          Você está prestes a{" "}
          <strong>
            {user.status === ClinicUserStatus.ATIVO ? "INATIVAR" : "ATIVAR"}
          </strong>{" "}
          o usuário <strong>{user.user.name ?? "selecionado"}</strong>.{" "}
        </p>
        <p>
          {user.status === ClinicUserStatus.ATIVO
            ? "Ele não terá mais acesso ao sistema."
            : "Ele voltará a ter acesso ao sistema."}
        </p>
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <ButtonPrimitive
          variant={user.status === ClinicUserStatus.ATIVO ? "danger" : "primary"}
          onClick={() =>
            handleSubmitStatus({
              status:
                user.status === ClinicUserStatus.ATIVO
                  ? ClinicUserStatus.INATIVO
                  : ClinicUserStatus.ATIVO,
            })
          }
          isLoading={isPending}
        >
          {user.status === ClinicUserStatus.ATIVO ? "Inativar" : "Ativar"}
        </ButtonPrimitive>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

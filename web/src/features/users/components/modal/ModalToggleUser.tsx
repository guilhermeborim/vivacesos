import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { User } from "@/shared/types"

interface ModalToggleUserProps {
  isOpen: boolean
  toggle: () => void
  user: User
  onSubmitInactive: (data: { active: boolean; id: string }) => void
  isPending: boolean
}

export function ModalToggleUser({
  isOpen,
  toggle,
  user,
  onSubmitInactive,
  isPending,
}: ModalToggleUserProps) {
  const isActive = !!user.status

  return (
    <ModalComponent.Root isOpen={isOpen} toggle={toggle}>
      <ModalComponent.Body>
        <h5>
          Tem certeza que deseja {isActive ? "Inativar" : "Ativar"} este usuário?
        </h5>
        <p>
          Você está prestes a{" "}
          <strong>{isActive ? "INATIVAR" : "ATIVAR"}</strong> o usuário{" "}
          <strong>{user.user.name ?? "selecionado"}</strong>.{" "}
        </p>
        <p>
          {isActive
            ? "Ele não terá mais acesso ao sistema."
            : "Ele voltará a ter acesso ao sistema."}
        </p>
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <ButtonPrimitive
          variant={isActive ? "danger" : "primary"}
          onClick={() => onSubmitInactive({ active: !isActive, id: user.id })}
          isLoading={isPending}
        >
          {isActive ? "Inativar" : "Ativar"}
        </ButtonPrimitive>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

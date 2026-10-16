import { ButtonPrimitive } from "../Button"
import { Body } from "./Body"
import { Footer } from "./Footer"
import { Root } from "./Root"

interface ConfirmStatusModalProps {
  isOpen: boolean
  toggle: () => void
  entity: string
  name?: string
  active: boolean
  onConfirm: () => void
  isPending: boolean
}

export function ConfirmStatusModal({
  isOpen,
  toggle,
  entity,
  name,
  active,
  onConfirm,
  isPending,
}: ConfirmStatusModalProps) {
  const action = active ? "Inativar" : "Ativar"

  return (
    <Root isOpen={isOpen} toggle={toggle}>
      <Body>
        <h5>
          Tem certeza que deseja {action} este {entity}?
        </h5>
        <p>
          Você está prestes a <strong>{action.toUpperCase()}</strong> o {entity}{" "}
          <strong>{name ?? "selecionado"}</strong>.{" "}
        </p>
        <p>
          {active
            ? "Ele não terá mais acesso ao sistema."
            : "Ele voltará a ter acesso ao sistema."}
        </p>
      </Body>
      <Footer>
        <ButtonPrimitive
          variant={active ? "danger" : "primary"}
          onClick={onConfirm}
          isLoading={isPending}
        >
          {action}
        </ButtonPrimitive>
      </Footer>
    </Root>
  )
}

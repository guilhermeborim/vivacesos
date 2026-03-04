import { ButtonPrimitive, ModalComponent } from "@/core/ui"

interface ModalToggleProfessionalProps {
  isOpen: boolean
  toggle: () => void
  professional: { id: string; name?: string; active: boolean }
  onSubmitInactive: (data: { active: boolean; id: string }) => void
}

export function ModalToggleProfessional({
  isOpen,
  toggle,
  professional,
  onSubmitInactive,
}: ModalToggleProfessionalProps) {
  return (
    <ModalComponent.Root isOpen={isOpen} toggle={toggle}>
      <ModalComponent.Body>
        <h5>
          Tem certeza que deseja {professional.active ? "Inativar" : "Ativar"} este
          Profissional?
        </h5>
        <p>
          Você está prestes a{" "}
          <strong>{professional.active ? "inativar" : "ativar"}</strong> o
          profissional <strong>{professional.name ?? "selecionado"}</strong>.{" "}
          {professional.active
            ? "Ele não terá mais acesso ao sistema."
            : "Ele voltará a ter acesso ao sistema."}
        </p>
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <ButtonPrimitive
          variant="success"
          onClick={() => onSubmitInactive({ active: professional.active, id: professional.id })}
        >
          Sim
        </ButtonPrimitive>
        <ButtonPrimitive variant="warning" onClick={toggle}>
          Não
        </ButtonPrimitive>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

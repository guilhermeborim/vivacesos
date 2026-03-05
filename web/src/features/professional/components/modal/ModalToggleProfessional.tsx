import { ButtonPrimitive, ModalComponent } from "@/core/ui"

interface ModalToggleProfessionalProps {
  isOpen: boolean
  toggle: () => void
  professional: { id: string; name?: string; active: boolean }
  onSubmitInactive: (data: { active: boolean; id: string }) => void
  isPending: boolean
}

export function ModalToggleProfessional({
  isOpen,
  toggle,
  professional,
  onSubmitInactive,
  isPending,
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
          <strong>{professional.active ? "INATIVAR" : "ATIVAR"}</strong> o profissional{" "}
          <strong>{professional.name ?? "selecionado"}</strong>.{" "}
        </p>
        <p>
          {professional.active
            ? "Ele não terá mais acesso ao sistema."
            : "Ele voltará a ter acesso ao sistema."}
        </p>
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <ButtonPrimitive
          variant={professional.active ? "danger" : "primary"}
          onClick={() =>
            onSubmitInactive({
              active: professional.active ? false : true,
              id: professional.id,
            })
          }
          isLoading={isPending}
        >
          {professional.active ? "Inativar" : "Ativar"}
        </ButtonPrimitive>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

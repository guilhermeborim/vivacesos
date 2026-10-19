import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { homeOptions } from "@/core/layouts/menu-visibility"
import { useAuth, useMyProfessional } from "@/shared/hooks"
import { useState } from "react"
import { toast } from "react-toastify"
import { Input, Label } from "reactstrap"
import { useHomePage } from "../hooks/use-home-page"

/** Escolhe a tela que abre sempre que o usuário entra no sistema (só neste navegador). */
export function HomePageModal({ onClose }: { onClose: () => void }) {
  const { session, hasPermission } = useAuth()
  const { isProfessional } = useMyProfessional()
  const { homePage, setHomePage } = useHomePage()
  const [value, setValue] = useState(homePage)

  const options = homeOptions({ hasPermission, isProfessional, role: session?.role })
  // Tela salva que o usuário não acessa mais: o seletor mostra o Dashboard.
  const selected = options.some((o) => o.value === value) ? value : "/dashboard"
  const groups = [...new Set(options.filter((o) => o.group).map((o) => o.group))]

  const save = () => {
    setHomePage(selected)
    toast.success("Tela inicial atualizada!")
    onClose()
  }

  return (
    <ModalComponent.Root isOpen toggle={onClose}>
      <ModalComponent.Header>Tela inicial</ModalComponent.Header>
      <ModalComponent.Body>
        <p className="text-muted">
          Escolha a tela que abre sempre que você entrar no sistema. A escolha vale para este
          navegador.
        </p>
        <Label className="form-label" htmlFor="home-page-select">
          Ao entrar, abrir
        </Label>
        <Input
          id="home-page-select"
          type="select"
          value={selected}
          onChange={(e) => setValue(e.target.value)}
        >
          {options
            .filter((o) => !o.group)
            .map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          {groups.map((group) => (
            <optgroup key={group} label={group}>
              {options
                .filter((o) => o.group === group)
                .map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </Input>
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <ButtonPrimitive variant="light" onClick={onClose}>
          Cancelar
        </ButtonPrimitive>
        <ButtonPrimitive onClick={save}>Salvar</ButtonPrimitive>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

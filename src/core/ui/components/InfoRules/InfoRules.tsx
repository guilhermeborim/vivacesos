import { ReactNode, useState } from "react"
import { Collapse } from "reactstrap"

interface InfoRulesProps {
  title?: string
  /** Cada item é uma regra em linguagem simples. */
  rules: ReactNode[]
  defaultOpen?: boolean
}

/** Painel recolhível que explica ao usuário como a tela funciona. */
export function InfoRules({ title = "Como funciona", rules, defaultOpen = false }: InfoRulesProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="alert alert-info border-0 mb-3 p-0">
      <button
        type="button"
        className="btn w-100 d-flex align-items-center gap-2 text-start px-3 py-2"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <i className="ri-information-line fs-18" />
        <strong className="flex-grow-1">{title}</strong>
        <i className={open ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} />
      </button>
      <Collapse isOpen={open}>
        <ul className="mb-0 px-4 pb-3 ps-5">
          {rules.map((rule, index) => (
            <li key={index} className="mb-1">
              {rule}
            </li>
          ))}
        </ul>
      </Collapse>
    </div>
  )
}

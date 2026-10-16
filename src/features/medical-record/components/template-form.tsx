import { InputController } from "@/core/ui"
import { useRef } from "react"
import { useFormContext } from "react-hook-form"
import { Badge, Col, Row } from "reactstrap"
import { TemplateTypeSchema } from "../schemas"

const VARIABLES = [
  { token: "{{paciente}}", hint: "Nome do paciente" },
  { token: "{{profissional}}", hint: "Seu nome" },
  { token: "{{data}}", hint: "Data de hoje" },
]

export function TemplateForm() {
  const { control, getValues, setValue } = useFormContext<TemplateTypeSchema>()
  const contentRef = useRef<HTMLDivElement>(null)

  // Insere a variável na posição do cursor (ou no fim, se o campo nunca foi focado).
  const insert = (token: string) => {
    const textarea = contentRef.current?.querySelector("textarea")
    const current = getValues("content") ?? ""
    const start = textarea?.selectionStart ?? current.length
    const end = textarea?.selectionEnd ?? current.length
    setValue("content", current.slice(0, start) + token + current.slice(end), {
      shouldDirty: true,
      shouldValidate: true,
    })
    requestAnimationFrame(() => {
      textarea?.focus()
      textarea?.setSelectionRange(start + token.length, start + token.length)
    })
  }

  return (
    <Row className="gap-3">
      <Col lg={12}>
        <InputController control={control} name="name" label="Nome" placeholder="Ex.: Receita" />
      </Col>
      <Col lg={12}>
        <div ref={contentRef}>
          <InputController
            control={control}
            name="content"
            label="Texto inicial"
            type="textarea"
            rows={10}
          />
        </div>
        <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
          <small className="text-muted">Clique para inserir no texto:</small>
          {VARIABLES.map((v) => (
            <Badge
              key={v.token}
              color="info"
              role="button"
              title={v.hint}
              className="cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() => insert(v.token)}
            >
              {v.token}
            </Badge>
          ))}
        </div>
      </Col>
    </Row>
  )
}

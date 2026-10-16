import { Col, Input, Label, Row } from "reactstrap"
import { FinanceFilters } from "../schemas"

interface FiltersProps {
  value: FinanceFilters
  onChange: (value: FinanceFilters) => void
  dateFieldLabels: [string, string]
  showPaid?: boolean
  /** Quando informado, exibe o filtro por profissional. */
  professionals?: { label: string; value: string }[]
}

export function Filters({
  value,
  onChange,
  dateFieldLabels,
  showPaid = true,
  professionals,
}: FiltersProps) {
  const set = (patch: Partial<FinanceFilters>) => onChange({ ...value, ...patch })

  return (
    <Row className="g-3 p-3 border-bottom">
      <Col md={3}>
        <Label className="form-label">De</Label>
        <Input type="date" value={value.from} onChange={(e) => set({ from: e.target.value })} />
      </Col>
      <Col md={3}>
        <Label className="form-label">Até</Label>
        <Input type="date" value={value.to} onChange={(e) => set({ to: e.target.value })} />
      </Col>
      <Col md={3}>
        <Label className="form-label">Filtrar por</Label>
        <Input
          type="select"
          value={value.dateField}
          onChange={(e) => set({ dateField: e.target.value as FinanceFilters["dateField"] })}
        >
          <option value="startsAt">{dateFieldLabels[0]}</option>
          <option value="paidAt">{dateFieldLabels[1]}</option>
        </Input>
      </Col>
      {showPaid && (
        <Col md={3}>
          <Label className="form-label">Pagamento</Label>
          <Input
            type="select"
            value={value.paid}
            onChange={(e) => set({ paid: e.target.value as FinanceFilters["paid"] })}
          >
            <option value="">Todos</option>
            <option value="true">Pagos</option>
            <option value="false">Pendentes</option>
          </Input>
        </Col>
      )}
      {professionals && (
        <Col md={3}>
          <Label className="form-label">Profissional</Label>
          <Input
            type="select"
            value={value.professionalId}
            onChange={(e) => set({ professionalId: e.target.value })}
          >
            <option value="">Todos</option>
            {professionals.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </Input>
        </Col>
      )}
    </Row>
  )
}

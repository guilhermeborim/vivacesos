import { ReactNode } from "react"
import { Card, CardBody, Col } from "reactstrap"

type Color = "primary" | "success" | "danger" | "warning" | "info"

interface StatCardProps {
  label: string
  value: ReactNode
  color?: Color
  /** Linha de apoio abaixo do número. */
  hint?: ReactNode
  /** Variação % sobre o mês anterior; `undefined` esconde, `null` mostra "sem comparação". */
  growth?: number | null
  icon?: string
}

/** Variação com seta e cor; o sinal e a seta também carregam o sentido (não só a cor). */
function Growth({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-muted fs-12">Sem comparação com o mês anterior</span>
  }
  const up = value > 0
  const flat = value === 0
  const color = flat ? "muted" : up ? "success" : "danger"
  const arrow = flat ? "ri-subtract-line" : up ? "ri-arrow-up-line" : "ri-arrow-down-line"

  return (
    <span className={`text-${color} fs-12 fw-medium`}>
      <i className={`${arrow} align-middle`} /> {up ? "+" : ""}
      {value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%{" "}
      <span className="text-muted fw-normal">vs. mês anterior</span>
    </span>
  )
}

export function StatCard({ label, value, color = "primary", hint, growth, icon }: StatCardProps) {
  return (
    <Col xl={3} md={6}>
      <Card className="card-animate border h-100">
        <CardBody>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <p className="text-uppercase fw-medium text-muted mb-0">{label}</p>
            {icon && <i className={`${icon} fs-20 text-${color}`} />}
          </div>
          <h4 className={`mb-1 text-${color}`}>{value}</h4>
          {growth !== undefined && <div>{<Growth value={growth} />}</div>}
          {hint && <div className="text-muted fs-12 mt-1">{hint}</div>}
        </CardBody>
      </Card>
    </Col>
  )
}

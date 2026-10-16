import { formatCurrency } from "@/shared/utils"
import { Card, CardBody, Col, Row } from "reactstrap"

export interface TotalItem {
  label: string
  value?: number
  color?: "success" | "danger" | "warning" | "primary"
}

export function Totals({ items }: { items: TotalItem[] }) {
  return (
    <Row className="px-3 pt-3">
      {items.map((item) => (
        <Col md key={item.label}>
          <Card className="card-animate border">
            <CardBody>
              <p className="text-uppercase fw-medium text-muted mb-2">{item.label}</p>
              <h4 className={`mb-0 text-${item.color ?? "primary"}`}>
                {formatCurrency(item.value ?? 0)}
              </h4>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

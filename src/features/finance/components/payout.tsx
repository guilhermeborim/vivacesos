import { ButtonPrimitive } from "@/core/ui"
import { formatCurrency } from "@/shared/utils"
import { useState } from "react"
import { Card, CardBody, Col, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap"
import { RevenueTotals } from "@/shared/types"

type Base = "received" | "total"

interface PayoutProps {
  professionalName: string
  totals?: RevenueTotals
  onCreateExpense?: (amount: number) => void
}

/** Repasse ao profissional: percentual sobre o recebido (ou o total) do período. */
export function Payout({ professionalName, totals, onCreateExpense }: PayoutProps) {
  const [percent, setPercent] = useState("")
  const [base, setBase] = useState<Base>("received")

  const baseValue = totals?.[base] ?? 0
  const pct = Number(percent.replace(",", "."))
  const amount = pct > 0 ? Math.round(baseValue * pct) / 100 : 0

  return (
    <Card className="border mx-3 mt-3">
      <CardBody>
        <h6 className="mb-3">Repasse — {professionalName}</h6>
        <Row className="g-3 align-items-end">
          <Col md={3}>
            <Label className="form-label">Base de cálculo</Label>
            <Input type="select" value={base} onChange={(e) => setBase(e.target.value as Base)}>
              <option value="received">Recebido</option>
              <option value="total">Total faturado</option>
            </Input>
          </Col>
          <Col md={3}>
            <Label className="form-label">Percentual</Label>
            <InputGroup>
              <Input
                type="number"
                min={0}
                max={100}
                step="0.01"
                inputMode="decimal"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
              />
              <InputGroupText>%</InputGroupText>
            </InputGroup>
          </Col>
          <Col md={3}>
            <p className="text-uppercase fw-medium text-muted mb-1">Valor a repassar</p>
            <h4 className="mb-0 text-primary">{formatCurrency(amount)}</h4>
          </Col>
          {onCreateExpense && (
            <Col md={3}>
              <ButtonPrimitive
                variant="info"
                disabled={amount <= 0}
                onClick={() => onCreateExpense(amount)}
              >
                Criar despesa
              </ButtonPrimitive>
            </Col>
          )}
        </Row>
      </CardBody>
    </Card>
  )
}

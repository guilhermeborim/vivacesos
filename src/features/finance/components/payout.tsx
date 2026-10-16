import { ButtonPrimitive, ModalComponent } from "@/core/ui"
import { PayoutItem } from "@/shared/types"
import { formatCurrency, formatDate, formatDateTime } from "@/shared/utils"
import { useEffect, useState } from "react"
import {
  Badge,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap"
import { useMutationDeletePayout, useMutationPayout } from "../api/mutations"
import { useQueryPayoutPreview, useQueryPayouts } from "../api/queries"

interface PayoutProps {
  professionalId: string
  professionalName: string
  /** Percentual cadastrado no profissional (preenche o campo). */
  defaultPercent?: number | null
  canManage: boolean
}

/**
 * Repasse ao profissional. O valor vem da API: consultas **pagas** e ainda não repassadas,
 * de qualquer período (os filtros de data da tela não mudam o repasse).
 */
export function Payout({
  professionalId,
  professionalName,
  defaultPercent,
  canManage,
}: PayoutProps) {
  const [percent, setPercent] = useState("")
  const [undoing, setUndoing] = useState<PayoutItem | null>(null)
  const mutation = useMutationPayout()
  const mutationUndo = useMutationDeletePayout()
  const { payouts } = useQueryPayouts(professionalId)

  useEffect(() => {
    setPercent(defaultPercent != null ? String(defaultPercent) : "")
  }, [professionalId, defaultPercent])

  const pct = Number(percent.replace(",", "."))
  const validPercent = pct > 0 && pct <= 100
  const { preview } = useQueryPayoutPreview(professionalId, validPercent ? pct : undefined)
  const amount = validPercent ? (preview?.amount ?? 0) : 0
  const nothingToPay = !preview || preview.eligibleCount === 0

  const launch = async () => {
    try {
      await mutation.mutateAsync({ professionalId, ...(validPercent && { percent: pct }) })
    } catch {
      // Erro já tratado no onError da mutation
    }
  }

  return (
    <Card className="border mx-3 mt-3">
      <CardBody>
        <h6 className="mb-1">Repasse — {professionalName}</h6>
        <p className="text-muted mb-3">
          Considera todas as consultas <strong>pagas</strong> deste profissional que ainda não foram
          repassadas, de qualquer período.
        </p>
        <Row className="g-3 align-items-end">
          <Col md={3}>
            <p className="text-uppercase fw-medium text-muted mb-1">A repassar (bruto)</p>
            <h5 className="mb-0">{formatCurrency(preview?.grossAmount ?? 0)}</h5>
            <small className="text-muted">{preview?.eligibleCount ?? 0} consulta(s) paga(s)</small>
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
                disabled={!canManage}
                onChange={(e) => setPercent(e.target.value)}
              />
              <InputGroupText>%</InputGroupText>
            </InputGroup>
            {!validPercent && (
              <small className="text-danger">
                {defaultPercent == null
                  ? "Percentual não configurado: informe aqui ou no cadastro do profissional."
                  : "Informe um percentual entre 0,01 e 100."}
              </small>
            )}
          </Col>
          <Col md={3}>
            <p className="text-uppercase fw-medium text-muted mb-1">Valor a repassar</p>
            <h4 className="mb-0 text-primary">{formatCurrency(amount)}</h4>
          </Col>
          {canManage && (
            <Col md={3}>
              <ButtonPrimitive
                variant="info"
                disabled={!validPercent || nothingToPay || amount <= 0}
                isLoading={mutation.isPending}
                onClick={launch}
              >
                Lançar repasse
              </ButtonPrimitive>
            </Col>
          )}
        </Row>

        {!!payouts?.length && (
          <div className="mt-4">
            <h6 className="mb-2">Repasses lançados</h6>
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Lançado em</th>
                    <th>Pagamentos até</th>
                    <th>Bruto</th>
                    <th>%</th>
                    <th>Repasse</th>
                    <th>Situação</th>
                    {canManage && <th />}
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((p) => (
                    <tr key={p.payoutId}>
                      <td>{formatDateTime(p.createdAt)}</td>
                      <td>{formatDateTime(p.cutoffAt)}</td>
                      <td>{formatCurrency(p.grossAmount)}</td>
                      <td>{p.percent.toLocaleString("pt-BR")}%</td>
                      <td>
                        <strong>{formatCurrency(p.amount)}</strong>
                      </td>
                      <td>
                        {p.paid ? (
                          <Badge color="success">PAGO</Badge>
                        ) : (
                          <Badge color="warning">PENDENTE · vence {formatDate(p.dueDate)}</Badge>
                        )}
                      </td>
                      {canManage && (
                        <td className="text-end">
                          {!p.paid && (
                            <ButtonPrimitive
                              size="sm"
                              variant="danger"
                              outline
                              onClick={() => setUndoing(p)}
                            >
                              Desfazer
                            </ButtonPrimitive>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardBody>

      {undoing && (
        <UndoPayoutModal
          payout={undoing}
          isPending={mutationUndo.isPending}
          toggle={() => setUndoing(null)}
          onConfirm={async () => {
            try {
              await mutationUndo.mutateAsync(undoing.payoutId)
              setUndoing(null)
            } catch {
              // Erro já tratado no onError da mutation
            }
          }}
        />
      )}
    </Card>
  )
}

interface UndoPayoutModalProps {
  payout: { amount: number }
  isPending: boolean
  toggle: () => void
  onConfirm: () => void
}

export function UndoPayoutModal({ payout, isPending, toggle, onConfirm }: UndoPayoutModalProps) {
  return (
    <ModalComponent.Root isOpen toggle={toggle}>
      <ModalComponent.Body>
        <h5>Desfazer este repasse?</h5>
        <p>
          O repasse de <strong>{formatCurrency(payout.amount)}</strong> será apagado junto com a
          despesa, e as consultas incluídas voltam a ficar disponíveis para um novo repasse.
        </p>
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <ButtonPrimitive variant="danger" onClick={onConfirm} isLoading={isPending}>
          Desfazer repasse
        </ButtonPrimitive>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

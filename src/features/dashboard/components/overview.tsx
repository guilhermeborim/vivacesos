import { InfoRules } from "@/core/ui"
import { useAuth } from "@/shared/hooks"
import { formatCurrency, formatDateTime } from "@/shared/utils"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap"
import { useQueryDashboard, useQueryDashboardAnalytics } from "../api"
import { AnalyticsCharts } from "./charts/analytics-charts"
import { StatCard } from "./stat-card"

const pad = (n: number) => String(n).padStart(2, "0")
const currentMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}`
}
const shiftMonth = (month: string, offset: number) => {
  const [year, m] = month.split("-").map(Number)
  const date = new Date(year, m - 1 + offset, 1)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`
}
const percent = (value: number | null | undefined) =>
  value === null || value === undefined
    ? "—"
    : `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`

const statusLabel: Record<string, string> = {
  AGENDADA: "agendadas",
  CONFIRMADA: "confirmadas",
  CONCLUIDA: "concluídas",
  CANCELADA: "canceladas",
  FALTOU: "faltas",
}
const breakdown = (byStatus: Record<string, number>) => {
  const parts = Object.entries(byStatus).map(([s, n]) => `${n} ${statusLabel[s] ?? s}`)
  return parts.length ? parts.join(" · ") : "Nenhuma consulta"
}

export function Overview() {
  const { hasPermission } = useAuth()
  const [month, setMonth] = useState(currentMonth)
  const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])
  const { overview, refetching } = useQueryDashboard(month, tz)
  const { analytics } = useQueryDashboardAnalytics(month, tz, hasPermission("DASHBOARD_ANALYTICS"))
  const isCurrentMonth = month === currentMonth()

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <h5 className="mb-0">Resumo do mês</h5>
        <div className="d-flex align-items-center gap-2">
          <Button color="light" size="sm" onClick={() => setMonth(shiftMonth(month, -1))}>
            <i className="ri-arrow-left-s-line" />
          </Button>
          <Input
            type="month"
            bsSize="sm"
            value={month}
            max={currentMonth()}
            onChange={(e) => e.target.value && setMonth(e.target.value)}
            style={{ width: 160 }}
          />
          <Button
            color="light"
            size="sm"
            disabled={isCurrentMonth}
            onClick={() => setMonth(shiftMonth(month, 1))}
          >
            <i className="ri-arrow-right-s-line" />
          </Button>
        </div>
      </div>

      <InfoRules
        rules={[
          "Os números mudam conforme o mês escolhido; “Consultas hoje” e “sem ficha” sempre mostram o dia de hoje.",
          "Recebido são as consultas pagas com data de pagamento no mês; A receber são as consultas do mês ainda não pagas.",
          "Consultas não pagas são as já concluídas que ainda não foram pagas.",
          "Taxa de faltas = faltas ÷ (consultas concluídas + faltas).",
          "A variação compara com o mês anterior até o mesmo dia do mês, para não comparar um mês inteiro com um mês pela metade.",
          "Estimativa de lucro = (recebido + a receber) − (despesas pagas + pendentes) − repasses a profissionais que ainda não viraram despesa. É uma projeção do mês.",
          "O profissional vê apenas os próprios números. “Produção” é o valor bruto das consultas dele; o que ele recebe é o repasse (percentual definido pelo ADMIN sobre as consultas pagas e ainda não repassadas).",
          "“Repasse a lançar” é uma estimativa; vira valor real quando o ADMIN lança o repasse, e “recebido” quando a clínica o paga. Lucro e crescimento aparecem só para o ADMIN.",
        ]}
      />

      {overview && (
        <div style={{ opacity: refetching ? 0.6 : 1, transition: "opacity 0.15s" }}>
          <Row className="g-3 mb-3">
            <StatCard
              label="Consultas hoje"
              icon="ri-calendar-check-line"
              value={overview.appointments.today.total}
              hint={breakdown(overview.appointments.today.byStatus)}
            />
            <StatCard
              label="Consultas no mês"
              icon="ri-calendar-2-line"
              value={overview.appointments.month.total}
              growth={analytics?.growth.appointments}
              hint={breakdown(overview.appointments.month.byStatus)}
            />
            <StatCard
              label="Taxa de faltas"
              icon="ri-user-unfollow-line"
              color={(overview.appointments.month.absenceRate ?? 0) > 15 ? "danger" : "primary"}
              value={percent(overview.appointments.month.absenceRate)}
              hint="Faltas ÷ (concluídas + faltas)"
            />
            <StatCard
              label="Pacientes"
              icon="ri-group-line"
              value={overview.patients.total}
              growth={analytics?.growth.patients}
              hint={`${overview.patients.newInMonth} novo(s) no mês`}
            />
          </Row>

          {overview.payout ? (
            <>
              {/* Profissional: valores brutos são da clínica; o que ele recebe é o repasse. */}
              <Row className="g-3 mb-3">
                <StatCard
                  label="Produção do mês (bruto)"
                  icon="ri-stethoscope-line"
                  value={formatCurrency(overview.revenue.received)}
                  hint="Valor das suas consultas pagas. Não é o seu repasse."
                />
                <StatCard
                  label="Consultas não pagas"
                  icon="ri-error-warning-line"
                  color={overview.unpaid.count > 0 ? "danger" : "primary"}
                  value={overview.unpaid.count}
                  hint={`${formatCurrency(overview.unpaid.amount)} em consultas concluídas`}
                />
              </Row>
              <h6 className="mb-2">Seu repasse</h6>
              <Row className="g-3 mb-3">
                <StatCard
                  label="Repasse a lançar (estimado)"
                  icon="ri-hand-coin-line"
                  color="primary"
                  value={
                    overview.payout.toLaunch.amount === null
                      ? "—"
                      : formatCurrency(overview.payout.toLaunch.amount)
                  }
                  hint={
                    overview.payout.percent === null
                      ? "Percentual não configurado: peça ao administrador."
                      : `${overview.payout.percent.toLocaleString("pt-BR")}% sobre ${formatCurrency(overview.payout.toLaunch.grossAmount)} (${overview.payout.toLaunch.count} consulta(s) paga(s) ainda sem repasse)`
                  }
                />
                <StatCard
                  label="Repasse lançado"
                  icon="ri-hourglass-line"
                  color="warning"
                  value={formatCurrency(overview.payout.launchedPending)}
                  hint="Aguardando pagamento pela clínica"
                />
                <StatCard
                  label="Repasse recebido no mês"
                  icon="ri-money-dollar-circle-line"
                  color="success"
                  value={formatCurrency(overview.payout.receivedInMonth)}
                  hint="Já pago a você neste mês"
                />
              </Row>
            </>
          ) : (
            <Row className="g-3 mb-3">
              <StatCard
                label="Recebido no mês"
                icon="ri-money-dollar-circle-line"
                color="success"
                value={formatCurrency(overview.revenue.received)}
                growth={analytics?.growth.revenue}
              />
              <StatCard
                label="A receber"
                icon="ri-time-line"
                color="warning"
                value={formatCurrency(overview.revenue.receivable)}
              />
              <StatCard
                label="Consultas não pagas"
                icon="ri-error-warning-line"
                color={overview.unpaid.count > 0 ? "danger" : "primary"}
                value={overview.unpaid.count}
                hint={`${formatCurrency(overview.unpaid.amount)} em consultas concluídas`}
              />
              {analytics && (
                <StatCard
                  label="Estimativa de lucro"
                  icon="ri-line-chart-line"
                  color={analytics.profitEstimate >= 0 ? "success" : "danger"}
                  value={formatCurrency(analytics.profitEstimate)}
                  hint={
                    analytics.payoutsToLaunch > 0
                      ? `Já desconta ${formatCurrency(analytics.payoutsToLaunch)} de repasses ainda não lançados`
                      : "Se tudo o que está previsto for pago"
                  }
                />
              )}
            </Row>
          )}

          {overview.expenses && (
            <Row className="g-3 mb-3">
              <StatCard
                label="Despesas pagas"
                icon="ri-arrow-down-circle-line"
                color="danger"
                value={formatCurrency(overview.expenses.paid)}
              />
              <StatCard
                label="Despesas pendentes"
                icon="ri-hourglass-line"
                color="warning"
                value={formatCurrency(overview.expenses.pending)}
              />
              <StatCard
                label="Saldo do mês"
                icon="ri-scales-3-line"
                color={(overview.balance ?? 0) >= 0 ? "success" : "danger"}
                value={formatCurrency(overview.balance ?? 0)}
                hint="Recebido − despesas pagas"
              />
            </Row>
          )}

          {analytics && <AnalyticsCharts analytics={analytics} />}

          {overview.pendingRecords.length > 0 && (
            <Card className="border">
              <CardBody>
                <h6 className="mb-3">
                  <i className="ri-file-list-3-line align-middle me-1" />
                  Consultas de hoje sem ficha ({overview.pendingRecords.length})
                </h6>
                <Row className="g-2">
                  {overview.pendingRecords.map((p) => (
                    <Col md={6} xl={4} key={p.appointmentId}>
                      <Link
                        to={`/medical-record/${p.patientId}/new?appointmentId=${p.appointmentId}`}
                        className="d-flex justify-content-between border rounded px-3 py-2 text-reset text-decoration-none"
                      >
                        <span>{p.patientName}</span>
                        <span className="text-muted">{formatDateTime(p.startsAt)}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </>
  )
}

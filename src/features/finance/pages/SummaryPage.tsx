import { BaseLayout, ButtonPrimitive, InfoRules } from "@/core/ui"
import { useState } from "react"
import { useQueryProfessionals } from "@/features/professional/api/queries"
import { formatCurrency, formatDate, formatDateTime } from "@/shared/utils"
import { useQueryFinanceSummary, useQueryPayoutPreview, useQueryPayouts } from "../api/queries"
import { Filters } from "../components/filters"
import { Totals } from "../components/totals"
import { useProfessionalFilter } from "../hooks"
import { FinanceFilters } from "../schemas"
import { printReportPdf, ReportSection } from "../report-pdf"
import { currentMonthFilters } from "../utils"

export function SummaryPage() {
  const [filters, setFilters] = useState<FinanceFilters>(currentMonthFilters)
  const { summary } = useQueryFinanceSummary(filters)
  const { options: professionals } = useProfessionalFilter()
  const { revenues, expenses, balance } = summary ?? {}

  const { dataProfessionals } = useQueryProfessionals()
  const professionalId = filters.professionalId || undefined
  const { preview } = useQueryPayoutPreview(professionalId)
  const { payouts } = useQueryPayouts(professionalId, !!professionalId)
  const professionalName = professionals?.find((p) => p.value === professionalId)?.label

  const handleExportPdf = () => {
    const sections: ReportSection[] = []

    if (professionalId) {
      // Com profissional filtrado: receitas dele e o repasse (despesas da clínica não se aplicam).
      const percent = dataProfessionals?.find(
        (p) => p.professional.professionalId === professionalId,
      )?.professional.payoutPercent
      const inPeriod = (payouts ?? []).filter((p) => {
        const day = new Date(p.createdAt).toLocaleDateString("sv-SE")
        return (!filters.from || day >= filters.from) && (!filters.to || day <= filters.to)
      })
      const sum = (list: typeof inPeriod) => list.reduce((total, p) => total + p.amount, 0)

      sections.push(
        {
          title: `Receitas — ${professionalName ?? "profissional"}`,
          rows: [
            { label: "Total", value: revenues?.total ?? 0 },
            { label: "Recebido", value: revenues?.received ?? 0 },
            { label: "A receber", value: revenues?.receivable ?? 0 },
          ],
        },
        {
          title: "Repasse a lançar",
          note: "Considera todas as consultas pagas do profissional que ainda não foram repassadas, de qualquer período.",
          rows: [
            {
              label: "Percentual do repasse",
              value: percent == null ? "Não configurado" : `${percent.toLocaleString("pt-BR")}%`,
            },
            {
              label: "Consultas pagas sem repasse",
              value: String(preview?.eligibleCount ?? 0),
            },
            { label: "Valor bruto", value: preview?.grossAmount ?? 0 },
            {
              label: "Repasse a lançar (estimado)",
              value: preview?.amount ?? "—",
            },
          ],
        },
        {
          title: "Repasses lançados no período",
          note: inPeriod.length === 0 ? "Nenhum repasse lançado no período." : undefined,
          rows: [
            { label: "Total lançado", value: sum(inPeriod) },
            { label: "Já pago", value: sum(inPeriod.filter((p) => p.paid)) },
            { label: "Pendente de pagamento", value: sum(inPeriod.filter((p) => !p.paid)) },
          ],
          table:
            inPeriod.length === 0
              ? undefined
              : {
                  columns: ["Lançado em", "Pagamentos até", "Bruto", "%", "Repasse", "Situação"],
                  rows: inPeriod.map((p) => [
                    formatDateTime(p.createdAt),
                    formatDateTime(p.cutoffAt),
                    formatCurrency(p.grossAmount),
                    `${p.percent.toLocaleString("pt-BR")}%`,
                    formatCurrency(p.amount),
                    p.paid && p.paidAt
                      ? `Pago em ${formatDateTime(p.paidAt)}`
                      : `Pendente (vence ${formatDate(p.dueDate)})`,
                  ]),
                },
        },
      )
    } else {
      sections.push({
        title: "Receitas",
        rows: [
          { label: "Total", value: revenues?.total ?? 0 },
          { label: "Recebido", value: revenues?.received ?? 0 },
          { label: "A receber", value: revenues?.receivable ?? 0 },
        ],
      })
      if (expenses) {
        sections.push(
          {
            title: "Despesas",
            rows: [
              { label: "Pago", value: expenses.paid },
              { label: "Pendente", value: expenses.pending },
            ],
          },
          {
            title: "Saldo (recebido − despesas pagas)",
            rows: [{ label: "Saldo", value: balance ?? 0 }],
          },
        )
      }
    }

    printReportPdf({ filters, professionalName, sections })
  }

  return (
    <BaseLayout.Root title="Relatório" pageTitle="Financeiro">
      <BaseLayout.Header isFilters={false}>
        <ButtonPrimitive variant="info" disabled={!summary} onClick={handleExportPdf}>
          <i className="ri-file-pdf-2-line align-bottom me-1"></i>
          Gerar PDF
        </ButtonPrimitive>
      </BaseLayout.Header>
      <BaseLayout.Body>
        <>
          <InfoRules
            rules={[
              "Por padrão mostra o mês atual. Você pode filtrar pela data da consulta/vencimento ou pela data do pagamento.",
              "Saldo = recebido − despesas pagas. Despesas pendentes não entram no saldo.",
              "Despesas e saldo aparecem só para quem tem acesso ao financeiro e quando nenhum profissional está filtrado (despesas são da clínica toda); o profissional vê apenas as próprias receitas.",
              "“Gerar PDF” abre a impressão do navegador: escolha “Salvar como PDF”. Com um profissional filtrado, o PDF traz as receitas dele, o repasse a lançar e os repasses lançados no período (sem as despesas da clínica).",
            ]}
          />
          <Filters
            value={filters}
            onChange={setFilters}
            dateFieldLabels={["Data da consulta / vencimento", "Data do pagamento"]}
            showPaid={false}
            professionals={professionals}
          />
          <h6 className="px-3 pt-3 mb-0">Receitas</h6>
          <Totals
            items={[
              { label: "Total", value: revenues?.total },
              {
                label: "Recebido",
                value: revenues?.received,
                color: "success",
              },
              {
                label: "A receber",
                value: revenues?.receivable,
                color: "warning",
              },
            ]}
          />
          {/* Despesas são da clínica toda: com profissional filtrado não se aplicam. */}
          {expenses && !filters.professionalId && (
            <>
              <h6 className="px-3 pt-3 mb-0">Despesas</h6>
              <Totals
                items={[
                  { label: "Pago", value: expenses.paid, color: "danger" },
                  {
                    label: "Pendente",
                    value: expenses.pending,
                    color: "warning",
                  },
                ]}
              />
              <h6 className="px-3 pt-3 mb-0">Saldo (recebido − despesas pagas)</h6>
              <Totals
                items={[
                  {
                    label: "Saldo",
                    value: balance,
                    color: (balance ?? 0) >= 0 ? "success" : "danger",
                  },
                ]}
              />
            </>
          )}
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

import { BaseLayout } from "@/core/ui"
import { useState } from "react"
import { useQueryFinanceSummary } from "../api/queries"
import { Filters } from "../components/filters"
import { Totals } from "../components/totals"
import { useProfessionalFilter } from "../hooks"
import { FinanceFilters } from "../schemas"
import { currentMonthFilters } from "../utils"

export function SummaryPage() {
  const [filters, setFilters] = useState<FinanceFilters>(currentMonthFilters)
  const { summary } = useQueryFinanceSummary(filters)
  const { options: professionals } = useProfessionalFilter()
  const { revenues, expenses, balance } = summary ?? {}

  return (
    <BaseLayout.Root title="Relatório" pageTitle="Financeiro">
      <BaseLayout.Header isFilters={false} />
      <BaseLayout.Body>
        <>
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
              { label: "Recebido", value: revenues?.received, color: "success" },
              { label: "A receber", value: revenues?.receivable, color: "warning" },
            ]}
          />
          {expenses && (
            <>
              <h6 className="px-3 pt-3 mb-0">Despesas</h6>
              <Totals
                items={[
                  { label: "Pago", value: expenses.paid, color: "danger" },
                  { label: "Pendente", value: expenses.pending, color: "warning" },
                ]}
              />
              <h6 className="px-3 pt-3 mb-0">Saldo (recebido − despesas pagas)</h6>
              <Totals
                items={[
                  { label: "Saldo", value: balance, color: (balance ?? 0) >= 0 ? "success" : "danger" },
                ]}
              />
            </>
          )}
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

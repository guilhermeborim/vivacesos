import { useQuery } from "@tanstack/react-query"
import { FinanceFilters } from "../schemas"
import { periodParams } from "../utils"
import { getExpenses, getFinanceSummary, getPayoutPreview, getPayouts, getRevenues } from "./routes"

const paidParam = (f: FinanceFilters) => (f.paid === "" ? undefined : f.paid === "true")

export function useQueryRevenues(filters: FinanceFilters) {
  const params = { ...periodParams(filters), paid: paidParam(filters) }
  const { data } = useQuery({
    queryKey: ["revenues", params],
    queryFn: () => getRevenues(params),
    retry: false,
  })

  return { totals: data?.data.totals, revenues: data?.data.revenues }
}

export function useQueryExpenses(filters: FinanceFilters) {
  const { from, to, dateField } = filters
  const params = {
    from: from || undefined,
    to: to || undefined,
    dateField,
    paid: paidParam(filters),
  }
  const { data } = useQuery({
    queryKey: ["expenses", params],
    queryFn: () => getExpenses(params),
    retry: false,
  })

  return { totals: data?.data.totals, expenses: data?.data.expenses }
}

export function useQueryFinanceSummary(filters: FinanceFilters) {
  const params = periodParams(filters)
  const { data } = useQuery({
    queryKey: ["summary", params],
    queryFn: () => getFinanceSummary(params),
    retry: false,
  })

  return { summary: data?.data }
}

/** Quanto seria repassado agora (a API calcula; o período dos filtros não interfere). */
export function useQueryPayoutPreview(professionalId: string | undefined, percent?: number) {
  const { data } = useQuery({
    queryKey: ["payout-preview", professionalId, percent],
    queryFn: () => getPayoutPreview({ professionalId: professionalId!, percent }),
    retry: false,
    enabled: !!professionalId,
  })
  return { preview: data?.data }
}

export function useQueryPayouts(professionalId?: string, enabled = true) {
  const { data } = useQuery({
    queryKey: ["payouts", professionalId],
    queryFn: () => getPayouts({ professionalId }),
    retry: false,
    enabled,
  })
  return { payouts: data?.data }
}

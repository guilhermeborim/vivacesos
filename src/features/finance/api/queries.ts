import { useQuery } from "@tanstack/react-query"
import { FinanceFilters } from "../schemas"
import { periodParams } from "../utils"
import { getExpenses, getFinanceSummary, getRevenues } from "./routes"

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

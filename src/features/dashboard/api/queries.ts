import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getDashboard, getDashboardAnalytics } from "./routes"

export function useQueryDashboard(month: string, tz: string) {
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["dashboard", month, tz],
    queryFn: () => getDashboard({ month, tz }),
    retry: false,
    placeholderData: keepPreviousData,
  })
  return { overview: data?.data, loadingOverview: isLoading, refetching: isPlaceholderData }
}

/** Análises só existem para o ADMIN; os demais papéis nem chamam. */
export function useQueryDashboardAnalytics(month: string, tz: string, enabled: boolean) {
  const { data } = useQuery({
    queryKey: ["dashboard-analytics", month, tz],
    queryFn: () => getDashboardAnalytics({ month, tz }),
    retry: false,
    enabled,
    placeholderData: keepPreviousData,
  })
  return { analytics: data?.data }
}

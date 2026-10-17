import { useQuery } from "@tanstack/react-query"
import { getTriage } from "./routes"

/** Cada leitura é auditada: sem refetch automático ao focar a janela. */
export function useQueryTriage(appointmentId: string | null | undefined) {
  const { data, isLoading } = useQuery({
    queryKey: ["triage", appointmentId],
    queryFn: () => getTriage(appointmentId!),
    retry: false,
    enabled: !!appointmentId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })
  return { triage: data?.data, loadingTriage: isLoading }
}

import { useQuery } from "@tanstack/react-query"
import { getNotifications } from "./routes"

/** `intervalMs` null = sem atualização automática (só ao abrir/voltar para a aba). */
export function useQueryNotifications(intervalMs: number | null) {
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    retry: false,
    refetchInterval: intervalMs ?? false,
    refetchIntervalInBackground: false,
  })
  return { notifications: data?.data }
}

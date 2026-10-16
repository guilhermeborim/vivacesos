import { useQuery } from "@tanstack/react-query"
import { getSettings } from "./routes"

export function useQuerySettings() {
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    retry: false,
  })
  return { settings: data?.data, loadingSettings: isLoading }
}

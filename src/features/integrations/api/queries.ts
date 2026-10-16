import { useQuery } from "@tanstack/react-query"
import { getGoogleProfessionals, getGoogleStatus, getIntegrations } from "./routes"

export function useQueryIntegrations() {
  const { data, isLoading } = useQuery({
    queryKey: ["integrations"],
    queryFn: getIntegrations,
    retry: false,
  })
  return { integrations: data?.data, loadingIntegrations: isLoading }
}

export function useQueryGoogleStatus() {
  const { data, isLoading } = useQuery({
    queryKey: ["google-status"],
    queryFn: getGoogleStatus,
    retry: false,
  })
  return { google: data?.data, loadingGoogle: isLoading }
}

export function useQueryGoogleProfessionals(enabled: boolean) {
  const { data } = useQuery({
    queryKey: ["google-professionals"],
    queryFn: getGoogleProfessionals,
    retry: false,
    enabled,
  })
  return { googleProfessionals: data?.data ?? [] }
}

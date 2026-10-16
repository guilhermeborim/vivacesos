import { useQuery } from "@tanstack/react-query"
import { getAvailability, getProfessionalById, getProfessionals } from "./routes"

export function useQueryProfessionals() {
  const { data, isLoading } = useQuery({
    queryKey: ["professional"],
    queryFn: getProfessionals,
    retry: false,
  })

  return {
    dataProfessionals: data?.data,
    isLoadingProfessionals: isLoading,
  }
}

export function useQueryProfessionalById(professionalId: string | null) {
  const { data: dataProfessionalById, isLoading: loadingProfessionalById } = useQuery({
    queryKey: ["professional", professionalId],
    queryFn: () => getProfessionalById(professionalId!),
    retry: false,
    enabled: !!professionalId,
  })

  return {
    professional: dataProfessionalById?.data,
    loadingProfessionalById,
  }
}

export function useQueryAvailability(professionalId: string | null | undefined) {
  const { data, isLoading } = useQuery({
    queryKey: ["availability", professionalId],
    queryFn: () => getAvailability(professionalId!),
    retry: false,
    enabled: !!professionalId,
  })
  return { availability: data?.data, loadingAvailability: isLoading }
}

import { useQuery } from "@tanstack/react-query"
import { getProfessionalById, getProfessionals } from "./"

export function useQueryProfessionals() {
  const { data } = useQuery({
    queryKey: ["professional"],
    queryFn: getProfessionals,
    retry: false,
  })

  return {
    dataProfessionals: data?.data,
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

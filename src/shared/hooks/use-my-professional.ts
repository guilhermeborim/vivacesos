import { useQueryProfessionals } from "@/features/professional/api/queries"
import { useAuth } from "./use-auth"

/** Profissional ativo vinculado ao usuário logado na clínica ativa (inclui o ADMIN que atende). */
export function useMyProfessional() {
  const { session } = useAuth()
  const { dataProfessionals, isLoadingProfessionals } = useQueryProfessionals()
  const mine = dataProfessionals?.find((p) => p.userId === session?.user.id)

  return {
    professionalId: mine?.professional.professionalId,
    name: mine?.professional.name,
    isProfessional: !!mine?.professional.active,
    isLoading: isLoadingProfessionals,
  }
}

import { useQueryProfessionals } from "@/features/professional/api/queries"
import { useAuth } from "@/shared/hooks"
import { Professional } from "@/shared/types"
import { Role } from "@/shared/enums"

/** Opções do filtro de profissional; o profissional logado não filtra (a API já o restringe). */
export function useProfessionalFilter() {
  const { session } = useAuth()
  const { dataProfessionals } = useQueryProfessionals()
  const enabled = session?.role !== Role.PROFISSIONAL

  return {
    options: enabled
      ? (dataProfessionals ?? []).map((p: Professional) => ({
          label: p.professional.name,
          value: p.professional.professionalId,
        }))
      : undefined,
  }
}

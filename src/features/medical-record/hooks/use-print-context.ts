import { useQueryClinicById } from "@/features/clinic/api/queries"
import { useQueryProfessionals } from "@/features/professional/api/queries"
import { useAuth } from "@/shared/hooks"
import { PrintContext } from "../print"

const formatCep = (cep: string) => cep.replace(/^(\d{5})(\d{3})$/, "$1-$2")
const formatPhone = (phone: string) => phone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3")

/** "Rua X, 123 - Sala 2, Centro, São Paulo · CEP 01001-000 · Tel. (11) 99999-8888" */
function formatAddress(clinic?: {
  road?: string
  number?: string
  complement?: string | null
  neighborhood?: string
  city?: string
  cep?: string
  phone?: string
}) {
  if (!clinic) return undefined
  const street = [[clinic.road, clinic.number].filter(Boolean).join(", "), clinic.complement]
    .filter(Boolean)
    .join(" - ")
  const parts = [
    [street, clinic.neighborhood, clinic.city].filter(Boolean).join(", "),
    clinic.cep ? `CEP ${formatCep(clinic.cep)}` : null,
    clinic.phone ? `Tel. ${formatPhone(clinic.phone)}` : null,
  ].filter(Boolean)
  return parts.join(" · ") || undefined
}

/**
 * Monta o contexto de impressão: clínica da sessão (nome e endereço) e dados (CRM, especialidade)
 * do profissional que assina; sem o `professionalId` do autor, vale o próprio usuário.
 */
export function usePrintContext() {
  const { session } = useAuth()
  const { dataProfessionals } = useQueryProfessionals()
  const { clinic } = useQueryClinicById(session?.activeClinic?.clinicId ?? null)

  return (opts: {
    patientName: string
    professionalId?: string
    professionalName?: string | null
    date?: string
  }): PrintContext => {
    const author = dataProfessionals?.find((p) =>
      opts.professionalId
        ? p.professional.professionalId === opts.professionalId
        : p.userId === session?.user.id,
    )
    return {
      clinicName: session?.activeClinic?.name ?? "",
      clinicAddress: formatAddress(clinic?.clinic),
      patientName: opts.patientName,
      professionalName:
        author?.professional.name ?? opts.professionalName ?? session?.user.name ?? "",
      crm: author?.professional.crm,
      specialty: author?.professional.specialty,
      date: opts.date,
    }
  }
}

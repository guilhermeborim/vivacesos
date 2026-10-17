import { useQuery } from "@tanstack/react-query"
import { getAgenda, getAgendaDays, getAppointmentById, getAppointments, getSlots } from "./routes"

export function useQueryAppointments() {
  const { data } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    retry: false,
  })

  return {
    dataAppointments: data?.data,
  }
}

export function useQueryAppointmentById(appointmentId: string | null) {
  const { data, isLoading } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointmentById(appointmentId!),
    retry: false,
    enabled: !!appointmentId,
  })

  return {
    appointment: data?.data,
    loadingAppointmentById: isLoading,
  }
}

/** Horas livres do profissional na data (só quando ele tem horários restritos). */
export function useQuerySlots(professionalId: string | undefined, date: string, enabled: boolean) {
  const { data, isFetching } = useQuery({
    queryKey: ["slots", professionalId, date],
    queryFn: () => getSlots({ professionalId: professionalId!, date }),
    retry: false,
    enabled: enabled && !!professionalId && !!date,
  })
  return { slots: data?.data.slots ?? [], loadingSlots: isFetching }
}

/** Grade e consultas do profissional num dia (AAAA-MM-DD, fuso da clínica). */
export function useQueryAgenda(professionalId: string | undefined, date: string) {
  const { data, isLoading } = useQuery({
    // Prefixo "appointments": qualquer mutation de consulta invalida a agenda também.
    queryKey: ["appointments", "agenda", professionalId, date],
    queryFn: () => getAgenda({ professionalId: professionalId!, date }),
    retry: false,
    enabled: !!professionalId && !!date,
  })
  return { agenda: data?.data, loadingAgenda: isLoading }
}

/** Dias do mês (AAAA-MM) com horário livre. */
export function useQueryAgendaDays(professionalId: string | undefined, month: string) {
  const { data } = useQuery({
    queryKey: ["appointments", "agenda-days", professionalId, month],
    queryFn: () => getAgendaDays({ professionalId: professionalId!, month }),
    retry: false,
    enabled: !!professionalId,
  })
  return { agendaDays: data?.data.days ?? [] }
}

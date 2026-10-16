import { useQuery } from "@tanstack/react-query"
import { getAppointmentById, getAppointments, getSlots } from "./routes"

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

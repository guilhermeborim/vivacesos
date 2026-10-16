import { useQuery } from "@tanstack/react-query"
import { getAppointmentById, getAppointments } from "./routes"

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

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { AgendaBookingPayload, postAgendaBooking } from "./routes"

export const useMutationAgendaBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AgendaBookingPayload) => postAgendaBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
      queryClient.invalidateQueries({ queryKey: ["slots"] })
      toast.success("Consulta agendada com sucesso!")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao agendar consulta")
      }
    },
  })
}

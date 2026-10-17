import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { TriageFormOutput } from "../schemas"
import { putTriage } from "./routes"

export const useMutationTriage = (appointmentId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: TriageFormOutput) => putTriage(appointmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["triage", appointmentId] })
      // A agenda mostra a etiqueta "Triagem feita".
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
      toast.success("Triagem registrada!")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao registrar triagem")
      }
    },
  })
}

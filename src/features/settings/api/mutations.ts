import { ClinicSettings } from "@/shared/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { putSettings } from "./routes"

export const useMutationSettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Partial<ClinicSettings>) => putSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] })
      toast.success("Configuração atualizada!")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao atualizar configuração")
      }
    },
  })
}

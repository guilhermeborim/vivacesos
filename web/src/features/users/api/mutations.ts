import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { CreateInviteTypeSchema } from "../schemas"
import { postINvite } from "./"

export const useMutationInvite = () => {
  return useMutation({
    mutationFn: async (payload: CreateInviteTypeSchema) => postINvite(payload),
    onSuccess: async () => {
      toast.success("Convite enviado com sucesso!")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao enviar convite")
      }
    },
  })
}

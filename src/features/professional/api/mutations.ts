import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { CreateProfessionalTypeSchema, UpdateProfessionalTypeSchema } from "../schemas"
import { postCreateProfessional, putProfessionalById } from "./routes"

export const useMutationCreateProfessional = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateProfessionalTypeSchema) =>
      await postCreateProfessional(payload),
    onSuccess: () => {
      toast.success("Profissional criado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["professional"] })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao criar Profissional")
      }
    },
  })
}

export const useMutationUpdateProfessional = (professionalId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateProfessionalTypeSchema) =>
      putProfessionalById(professionalId, payload),
    onSuccess: () => {
      toast.success("Profissional atualizado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["professional"] })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao atualizar Profissional")
      }
    },
  })
}

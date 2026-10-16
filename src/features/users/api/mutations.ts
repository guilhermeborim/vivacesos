import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import {
  CreateInviteTypeSchema,
  UpdateStatusUserSchema,
  UpdateUserTypeSchema,
} from "../schemas"
import { PatchStatusByUserId, postINvite, putUserById } from "./routes"

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

export const useMutationUpdateUser = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateUserTypeSchema) => putUserById(userId, payload),
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao atualizar usuário")
      }
    },
  })
}

export const useMutationUpdateStatusUser = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateStatusUserSchema) =>
      PatchStatusByUserId(userId, payload),
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao atualizar usuário")
      }
    },
  })
}

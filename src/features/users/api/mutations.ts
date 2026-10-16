import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import {
  CreateInviteTypeSchema,
  UpdateStatusUserSchema,
  UpdateUserTypeSchema,
} from "../schemas"
import { InviteResult, PatchStatusByUserId, postINvite, postResendInvite, putUserById } from "./routes"

const notifyInvite = (result: InviteResult, successMessage: string) => {
  if (result.emailSent) {
    toast.success(successMessage)
  } else {
    toast.warning(
      "O convite foi salvo, mas o e-mail não pôde ser enviado. Use “Reenviar convite” para tentar de novo.",
    )
  }
}

export const useMutationInvite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateInviteTypeSchema) => postINvite(payload),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      notifyInvite(data, "Convite enviado por e-mail com sucesso!")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao enviar convite")
      }
    },
  })
}

export const useMutationResendInvite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (inviteId: string) => postResendInvite(inviteId),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      notifyInvite(data, "Convite reenviado por e-mail!")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao reenviar convite")
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

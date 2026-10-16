import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import {
  CreateClinicFormTypeSchema,
  UpdateClinicFormTypeSchema,
} from "../schemas"
import { postCreateClinic, postSelectClinic, putClinicById } from "./routes"

export const useMutationUpdateClinic = (clinicId: string) => {
  return useMutation({
    mutationFn: async (payload: UpdateClinicFormTypeSchema) =>
      putClinicById(clinicId, payload),
    onSuccess: async () => {
      toast.success("Clínica atualizada com sucesso!")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao atualizar Clínica")
      }
    },
  })
}

export const useMutationSelectClinic = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (clinicId: string) => postSelectClinic(clinicId),
    onSuccess: () => {
      toast.success("Clínica selecionada com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["session"] })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao selecionar Clínica")
      }
    },
  })
}

export const useMutationCreateClinic = () => {
  return useMutation({
    mutationFn: (payload: CreateClinicFormTypeSchema) => postCreateClinic(payload),
    onSuccess: async () => {
      toast.success("Clínica criada com sucesso!")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao criar Clínica")
      }
    },
  })
}

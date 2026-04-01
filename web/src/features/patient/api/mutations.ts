import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { CreatePatientTypeSchema, UpdatePatientTypeSchema } from "../schemas"
import { postPatient, putPatientById } from "./"

export const useMutationPatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreatePatientTypeSchema) => postPatient(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })

      toast.success("Paciente cadastrado com sucesso!")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao cadastrar paciente")
      }
    },
  })
}

export const useMutationUpdatePatient = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdatePatientTypeSchema) =>
      putPatientById(patientId, payload),
    onSuccess: () => {
      toast.success("Paciente atualizado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["patients"] })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao atualizar paciente")
      }
    },
  })
}

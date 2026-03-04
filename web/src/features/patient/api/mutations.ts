import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { CreatePatientTypeSchema } from "../schemas"
import { postPatient } from "./"

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

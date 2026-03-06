import { UpdateClinicFormTypeSchema } from "@/shared/schemas"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { putClinicById } from "./"

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

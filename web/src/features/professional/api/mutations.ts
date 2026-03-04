import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { CreateProfessionalTypeSchema, UpdateProfessionalTypeSchema } from "../schemas"
import {
  getProfessionalById,
  getProfessionals,
  postCreateProfessional,
  putProfessionalById,
} from "./routes"

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

export function useQueryProfessionals() {
  const { data } = useQuery({
    queryKey: ["professional"],
    queryFn: getProfessionals,
    retry: false,
  })

  const dataProfessionals = data?.data

  return {
    dataProfessionals,
  }
}

export function useQueryProfessionalById(professionalId: string | null) {
  const { data: dataProfessionalById, isLoading: loadingProfessionalById } = useQuery({
    queryKey: ["professional", professionalId],
    queryFn: () => getProfessionalById(professionalId!),
    retry: false,
    enabled: !!professionalId,
  })

  return {
    professional: dataProfessionalById?.data,
    loadingProfessionalById,
  }
}

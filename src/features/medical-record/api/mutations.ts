import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { CancelEntryTypeSchema, CreateEntryTypeSchema, TemplateTypeSchema } from "../schemas"
import {
  deleteRecordTemplate,
  postCancelEntry,
  putClinicalProfile,
  postEntry,
  postRecordTemplate,
  putRecordTemplate,
} from "./routes"

const onError = (fallback: string) => (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data.message || fallback)
  }
}

export const useMutationEntry = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateEntryTypeSchema) => postEntry(patientId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["medical-record", patientId],
      })
      queryClient.invalidateQueries({ queryKey: ["medical-records"] })
      toast.success("Ficha registrada com sucesso!")
    },
    onError: onError("Erro ao registrar ficha"),
  })
}

export const useMutationCancelEntry = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ entryId, ...payload }: CancelEntryTypeSchema & { entryId: string }) =>
      postCancelEntry(entryId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["medical-record", patientId],
      })
      toast.success("Ficha cancelada!")
    },
    onError: onError("Erro ao cancelar ficha"),
  })
}

export const useMutationTemplate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: TemplateTypeSchema) => postRecordTemplate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["record-templates"] })
      toast.success("Modelo criado com sucesso!")
    },
    onError: onError("Erro ao criar modelo"),
  })
}

export const useMutationUpdateTemplate = (templateId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: TemplateTypeSchema) => putRecordTemplate(templateId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["record-templates"] })
      toast.success("Modelo atualizado com sucesso!")
    },
    onError: onError("Erro ao atualizar modelo"),
  })
}

export const useMutationDeleteTemplate = (templateId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteRecordTemplate(templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["record-templates"] })
      toast.success("Modelo removido!")
    },
    onError: onError("Erro ao remover modelo"),
  })
}

export const useMutationClinicalProfile = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Parameters<typeof putClinicalProfile>[1]) =>
      putClinicalProfile(patientId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinical-profile", patientId] })
      toast.success("Dados básicos atualizados!")
    },
    onError: onError("Erro ao atualizar dados básicos"),
  })
}

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import {
  getGoogleAuthUrl,
  postGoogleDisconnect,
  postGoogleProfessionalCalendar,
  postGoogleSyncAll,
} from "./routes"

const onError = (fallback: string) => (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || fallback)
  }
}

const useRefresh = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ["google-status"] })
    queryClient.invalidateQueries({ queryKey: ["google-professionals"] })
    queryClient.invalidateQueries({ queryKey: ["integrations"] })
  }
}

/** Pede a URL de autorização e leva o ADMIN para o Google. */
export const useMutationGoogleConnect = () =>
  useMutation({
    mutationFn: getGoogleAuthUrl,
    onSuccess: ({ data }) => {
      window.location.href = data.url
    },
    onError: onError("Erro ao conectar com o Google"),
  })

export const useMutationGoogleDisconnect = () => {
  const refresh = useRefresh()
  return useMutation({
    mutationFn: postGoogleDisconnect,
    onSuccess: () => {
      refresh()
      toast.success("Google Agenda desconectado.")
    },
    onError: onError("Erro ao desconectar"),
  })
}

export const useMutationGoogleSyncAll = () => {
  const refresh = useRefresh()
  return useMutation({
    mutationFn: postGoogleSyncAll,
    onSuccess: ({ data }) => {
      refresh()
      toast.success(`${data.synced} de ${data.processed} consulta(s) enviada(s) ao Google.`)
    },
    onError: onError("Erro ao sincronizar"),
  })
}

export const useMutationGoogleCalendar = () => {
  const refresh = useRefresh()
  return useMutation({
    mutationFn: (professionalId: string) => postGoogleProfessionalCalendar(professionalId),
    onSuccess: () => {
      refresh()
      toast.success("Agenda criada no Google!")
    },
    onError: onError("Erro ao criar a agenda"),
  })
}

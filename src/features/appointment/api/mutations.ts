import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import {
  CreateAppointmentTypeSchema,
  UpdateAppointmentStatusPayload,
  UpdateAppointmentTypeSchema,
} from "../schemas"
import {
  AgendaBookingPayload,
  patchAppointmentPayment,
  patchAppointmentStatus,
  postAgendaBooking,
  postAppointment,
  putAppointmentById,
} from "./routes"

const onError = (fallback: string) => (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data.message || fallback)
  }
}

export const useMutationAppointment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateAppointmentTypeSchema) => postAppointment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
      toast.success("Consulta agendada com sucesso!")
    },
    onError: onError("Erro ao agendar consulta"),
  })
}

export const useMutationUpdateAppointment = (appointmentId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateAppointmentTypeSchema) =>
      putAppointmentById(appointmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
      toast.success("Consulta atualizada com sucesso!")
    },
    onError: onError("Erro ao atualizar consulta"),
  })
}

export const useMutationUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      appointmentId,
      ...payload
    }: UpdateAppointmentStatusPayload & { appointmentId: string }) =>
      patchAppointmentStatus(appointmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
      toast.success("Status da consulta atualizado!")
    },
    onError: onError("Erro ao atualizar status da consulta"),
  })
}

export const useMutationAppointmentPayment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      appointmentId,
      ...payload
    }: {
      appointmentId: string
      paid: boolean
      paymentMethod?: string
    }) => patchAppointmentPayment(appointmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
      queryClient.invalidateQueries({ queryKey: ["revenues"] })
      queryClient.invalidateQueries({ queryKey: ["summary"] })
      toast.success("Pagamento da consulta atualizado!")
    },
    onError: onError("Erro ao atualizar pagamento da consulta"),
  })
}

export const useMutationAgendaBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AgendaBookingPayload) => postAgendaBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
      queryClient.invalidateQueries({ queryKey: ["slots"] })
      toast.success("Consulta agendada com sucesso!")
    },
    onError: onError("Erro ao agendar consulta"),
  })
}

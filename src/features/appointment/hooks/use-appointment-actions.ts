import { postAppointmentMessage } from "@/features/integrations/api/routes"
import { getAppointmentEntryStatus } from "@/features/medical-record/api/routes"
import { AppointmentStatus } from "@/shared/enums"
import { useAuth } from "@/shared/hooks"
import { Appointment } from "@/shared/types"
import { AxiosError } from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { useMutationAppointmentPayment, useMutationUpdateAppointmentStatus } from "../api/mutations"
import { useEditAppointment } from "./use-edit-appointment"

type AppointmentData = Appointment["appointment"]

/** Tudo o que se faz numa consulta (editar, pagar, confirmar, concluir, faltar, cancelar, WhatsApp). */
export function useAppointmentActions() {
  const { hasPermission } = useAuth()
  const edit = useEditAppointment()
  const mutationStatus = useMutationUpdateAppointmentStatus()
  const mutationPayment = useMutationAppointmentPayment()
  const [paying, setPaying] = useState<AppointmentData | null>(null)
  /** Consulta a concluir sem ficha (pede confirmação). */
  const [concluding, setConcluding] = useState<string | null>(null)
  /** Cancelar ou marcar falta (pede confirmação). */
  const [confirming, setConfirming] = useState<{
    appointment: AppointmentData
    status: AppointmentStatus.CANCELADA | AppointmentStatus.FALTOU
  } | null>(null)
  const canViewRecords = hasPermission("RECORD_VIEW")

  // Abre a aba antes da chamada (senão o navegador bloqueia o pop-up) e depois aponta para o wa.me.
  const sendWhatsapp = async (appointmentId: string) => {
    const tab = window.open("", "_blank")
    try {
      const { data } = await postAppointmentMessage(appointmentId)
      if (tab) tab.location.href = data.whatsappUrl
      else window.location.href = data.whatsappUrl
    } catch (error) {
      tab?.close()
      toast.error(
        error instanceof AxiosError
          ? (error.response?.data?.message ?? "Erro ao montar a mensagem")
          : "Erro ao montar a mensagem",
      )
    }
  }

  const changeStatus = async (appointment: AppointmentData, status: AppointmentStatus) => {
    const appointmentId = appointment.appointmentId
    if (status === AppointmentStatus.CANCELADA || status === AppointmentStatus.FALTOU) {
      setConfirming({ appointment, status })
      return
    }
    // Ao concluir, avisa se a consulta ainda não tem ficha no prontuário.
    if (status === AppointmentStatus.CONCLUIDA && canViewRecords) {
      try {
        const { data } = await getAppointmentEntryStatus(appointmentId)
        if (!data.hasActiveEntry) {
          setConcluding(appointmentId)
          return
        }
      } catch {
        // Sem como verificar a ficha: segue com a conclusão normal
      }
    }
    mutationStatus.mutate({ appointmentId, status })
  }

  const billingOnly =
    edit.appointment?.appointment.status === AppointmentStatus.CONCLUIDA ||
    edit.appointment?.appointment.status === AppointmentStatus.CHEGOU

  return {
    edit,
    billingOnly,
    mutationStatus,
    mutationPayment,
    paying,
    setPaying,
    concluding,
    setConcluding,
    confirming,
    setConfirming,
    sendWhatsapp,
    changeStatus,
    canPay: hasPermission("FINANCE_MANAGE"),
  }
}

export type AppointmentActions = ReturnType<typeof useAppointmentActions>

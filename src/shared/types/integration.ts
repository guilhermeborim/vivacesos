export type IntegrationStatus = "DISCONNECTED" | "PENDING" | "CONNECTED"

export type IntegrationsOverview = {
  googleCalendar: { provider: "GOOGLE_CALENDAR"; status: IntegrationStatus; connectedAt: string | null }
  whatsapp: {
    provider: "WHATSAPP"
    status: IntegrationStatus
    connectedAt: string | null
    /** Envia sozinho (Z-API conectada); hoje é sempre manual. */
    automaticSending: boolean
    manualSending: boolean
  }
}

/** Mensagem de WhatsApp pronta para a recepcionista enviar. */
export type AppointmentMessage = {
  phone: string
  text: string
  link: string
  whatsappUrl: string
  automatic: boolean
}

/** Dados mínimos da consulta na página pública de confirmação. */
export type PublicAppointment = {
  clinicName: string
  professionalName: string | null
  patientFirstName: string
  startsAt: string
  status: string
  canConfirm: boolean
  canCancel: boolean
  message?: string
}

export type GoogleStatus = {
  /** Credenciais do Google presentes no servidor. */
  configured: boolean
  status: IntegrationStatus
  accountEmail: string | null
  connectedAt: string | null
  /** Consultas aguardando envio para a Google Agenda. */
  pendingSync: number
}

export type GoogleProfessional = {
  professionalId: string
  name: string | null
  active: boolean
  hasCalendar: boolean
}

import { AppointmentStatus } from "../enums"

export type MedicalRecordEntryStatus = "ATIVA" | "CANCELADA"

export type MedicalRecordListItem = {
  recordId: string
  patient: { patientId: string; name: string; birthDate: string; active: boolean }
  lastEntryAt: string | null
}

export type MedicalRecordDayItem = {
  recordId: string | null
  appointment: {
    appointmentId: string
    startsAt: string
    endsAt: string
    status: AppointmentStatus
  }
  patient: { patientId: string; name: string }
}

export type Prescription = {
  itemId?: string
  medication: string
  dose?: string
  unit?: string
  frequency?: string
  duration?: string
  instructions?: string
}

export type ExamRequest = {
  itemId?: string
  name: string
  notes?: string
}

export type Certificate = {
  itemId?: string
  /** Dias de afastamento; vazio = atestado de comparecimento. */
  days?: number
  /** CID-10 (opcional). */
  cid?: string
  text: string
}

export type Referral = {
  itemId?: string
  specialty: string
  reason?: string
}

export type MedicalRecordEntry = {
  entryId: string
  parentEntryId: string | null
  status: MedicalRecordEntryStatus
  content: string
  cancelReason: string | null
  canceledAt: string | null
  createdAt: string
  prescriptions: Prescription[]
  exams: ExamRequest[]
  certificates: Certificate[]
  referrals: Referral[]
  appointment: { appointmentId: string; startsAt: string }
  professional: { professionalId: string; name: string | null }
}

export type MedicalRecordTimeline = {
  recordId: string
  patient: { patientId: string; name: string; birthDate: string; active: boolean }
  entries: MedicalRecordEntry[]
}

export type RecordTemplate = {
  templateId: string
  name: string
  content: string
  createdAt: string
  updatedAt: string
}

export type RecordAuditAction =
  | "VIEW_RECORD"
  | "CREATE_ENTRY"
  | "CANCEL_ENTRY"
  | "VIEW_AUDIT"
  | "VIEW_PROFILE"
  | "UPDATE_PROFILE"
  | "VIEW_TRIAGE"
  | "SAVE_TRIAGE"

export type RecordAuditItem = {
  auditId: string
  action: RecordAuditAction
  createdAt: string
  role: string
  entryId: string | null
  user: { userId: string; name: string }
  patient: { patientId: string; name: string } | null
}

export type RecordAuditResponse = { total: number; items: RecordAuditItem[] }

export type Diabetes = "SIM" | "NAO" | "NA"

/** Dados básicos de saúde do paciente (só o valor atual). */
export type ClinicalProfile = {
  patientId: string
  profile: {
    heightCm: number | null
    weightKg: number | null
    diabetes: Diabetes | null
    drugAllergies: string | null
    otherInfo: string | null
  }
  updatedAt: string | null
  updatedBy: { userId: string; name: string } | null
}

/** Triagem da consulta (só o valor atual). */
export type Triage = {
  appointmentId: string
  triage: {
    systolic: number | null
    diastolic: number | null
    heartRate: number | null
    respiratoryRate: number | null
    temperatureC: number | null
    spo2: number | null
    weightKg: number | null
    heightCm: number | null
    notes: string | null
  }
  updatedAt: string | null
  updatedBy: { userId: string; name: string } | null
}

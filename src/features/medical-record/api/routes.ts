import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import {
  ClinicalProfile,
  MedicalRecordDayItem,
  MedicalRecordListItem,
  MedicalRecordTimeline,
  RecordAuditResponse,
  RecordTemplate,
} from "@/shared/types"
import { CancelEntryTypeSchema, CreateEntryTypeSchema, TemplateTypeSchema } from "../schemas"

export const getMedicalRecords = () => api.get<MedicalRecordListItem[]>(url.GET_MEDICAL_RECORDS)

export const getMedicalRecordsDay = (params: { from: string; to: string }) =>
  api.get<MedicalRecordDayItem[]>(url.GET_MEDICAL_RECORDS_DAY, { params })

export const getMedicalRecordByPatient = (patientId: string) =>
  api.get<MedicalRecordTimeline>(url.GET_MEDICAL_RECORD_BY_PATIENT.replace(":patientId", patientId))

export const postEntry = (patientId: string, payload: CreateEntryTypeSchema) =>
  api.post(url.POST_MEDICAL_RECORD_ENTRY.replace(":patientId", patientId), payload)

export const postCancelEntry = (entryId: string, payload: CancelEntryTypeSchema) =>
  api.post(url.POST_MEDICAL_RECORD_ENTRY_CANCEL.replace(":entryId", entryId), payload)

export const getRecordTemplates = () => api.get<RecordTemplate[]>(url.GET_RECORD_TEMPLATES)

export const postRecordTemplate = (payload: TemplateTypeSchema) =>
  api.post(url.POST_RECORD_TEMPLATE, payload)

export const putRecordTemplate = (templateId: string, payload: Partial<TemplateTypeSchema>) =>
  api.put(url.PUT_RECORD_TEMPLATE_BY_ID.replace(":templateId", templateId), payload)

export const deleteRecordTemplate = (templateId: string) =>
  api.delete(url.DELETE_RECORD_TEMPLATE_BY_ID.replace(":templateId", templateId))

export const getRecordAudit = (params: Record<string, string | number | undefined>) =>
  api.get<RecordAuditResponse>(url.GET_RECORD_AUDIT, { params })

export const getAppointmentEntryStatus = (appointmentId: string) =>
  api.get<{ hasActiveEntry: boolean }>(
    url.GET_APPOINTMENT_ENTRY_STATUS.replace(":appointmentId", appointmentId),
  )

export const getClinicalProfile = (patientId: string) =>
  api.get<ClinicalProfile>(url.GET_CLINICAL_PROFILE.replace(":patientId", patientId))

export const putClinicalProfile = (patientId: string, payload: ClinicalProfile["profile"]) =>
  api.put<ClinicalProfile>(url.PUT_CLINICAL_PROFILE.replace(":patientId", patientId), payload)

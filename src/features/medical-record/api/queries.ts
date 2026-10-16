import { useQuery } from "@tanstack/react-query"
import {
  getClinicalProfile,
  getMedicalRecordByPatient,
  getMedicalRecords,
  getMedicalRecordsDay,
  getRecordAudit,
  getRecordTemplates,
} from "./routes"

export function useQueryMedicalRecords() {
  const { data } = useQuery({
    queryKey: ["medical-records"],
    queryFn: getMedicalRecords,
    retry: false,
  })
  return { dataRecords: data?.data }
}

export function useQueryMedicalRecordsDay(range: { from: string; to: string }) {
  const { data } = useQuery({
    queryKey: ["medical-records-day", range],
    queryFn: () => getMedicalRecordsDay(range),
    retry: false,
  })
  return { dataDay: data?.data }
}

export function useQueryMedicalRecordByPatient(patientId: string | undefined) {
  const { data, isLoading } = useQuery({
    queryKey: ["medical-record", patientId],
    queryFn: () => getMedicalRecordByPatient(patientId!),
    retry: false,
    enabled: !!patientId,
  })
  return { timeline: data?.data, loadingTimeline: isLoading }
}

export function useQueryRecordTemplates() {
  const { data } = useQuery({
    queryKey: ["record-templates"],
    queryFn: getRecordTemplates,
    retry: false,
  })
  return { templates: data?.data }
}

export function useQueryRecordAudit(params: Record<string, string | number | undefined>) {
  const { data } = useQuery({
    queryKey: ["record-audit", params],
    queryFn: () => getRecordAudit(params),
    retry: false,
  })
  return { audit: data?.data }
}

export function useQueryClinicalProfile(patientId: string | undefined) {
  const { data, isLoading } = useQuery({
    queryKey: ["clinical-profile", patientId],
    queryFn: () => getClinicalProfile(patientId!),
    retry: false,
    enabled: !!patientId,
  })
  return { clinicalProfile: data?.data, loadingClinicalProfile: isLoading }
}

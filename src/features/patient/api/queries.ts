import { useQuery } from "@tanstack/react-query"
import { getPatientById, getPatients } from "./routes"

export function useQueryPatients() {
  const { data } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
    retry: false,
  })

  return {
    dataPatients: data?.data,
  }
}

export function useQuerypatientById(patientId: string | null) {
  const { data: dataPatientById, isLoading: loadingPatientById } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatientById(patientId!),
    retry: false,
    enabled: !!patientId,
  })

  return {
    patient: dataPatientById?.data,
    loadingPatientById,
  }
}

import { useQuery } from "@tanstack/react-query"
import { getClinicById, getClinicsByUser } from "./"

export function useQueryClinic() {
  const { data } = useQuery({
    queryKey: ["clinic"],
    queryFn: getClinicsByUser,
    retry: false,
  })

  return {
    dataClinics: data?.data,
  }
}

export function useQueryClinicById(clinicId: string | null) {
  const { data: dataClinicById } = useQuery({
    queryKey: ["clinic", clinicId],
    queryFn: () => getClinicById(clinicId!),
    retry: false,
    enabled: !!clinicId,
  })

  return {
    clinic: dataClinicById?.data,
  }
}

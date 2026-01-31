import { useQuery } from "@tanstack/react-query";
import { getClinicById, getClinicsByUser } from "helpers/backend_helper";

export function useQueryClinic() {
  const { data: dataClinics } = useQuery({
    queryKey: ["clinic"],
    queryFn: getClinicsByUser,
    retry: false,
  });

  return {
    dataClinics,
  };
}

export function useQueryClinicById(clinicId: string | null) {
  const { data: dataClinicById } = useQuery({
    queryKey: ["clinic", clinicId],
    queryFn: () => getClinicById(clinicId!),
    retry: false,
    enabled: !!clinicId,
  });

  return {
    clinic: dataClinicById?.data.clinic,
  };
}

import { useQueryClinic } from "../api"

export const useListClinics = () => {
  const { dataClinics } = useQueryClinic()

  return {
    data: {
      dataClinics,
    },
  }
}

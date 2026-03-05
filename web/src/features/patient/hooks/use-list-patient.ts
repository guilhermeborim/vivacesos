import { useQueryPatients } from "../api"

export const useListPatients = () => {
  const { dataPatients } = useQueryPatients()

  return {
    data: {
      dataPatients,
    },
  }
}

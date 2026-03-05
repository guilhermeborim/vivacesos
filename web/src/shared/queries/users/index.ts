import { getUsersByClinic } from "@/features/users/api"
import { useQuery } from "@tanstack/react-query"

export function useQueryUsers() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersByClinic,
    retry: false,
  })

  return {
    dataUsers: data?.data,
  }
}

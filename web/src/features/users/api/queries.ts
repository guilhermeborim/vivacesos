import { useQuery } from "@tanstack/react-query"
import { getUserById, getUsersByClinic } from "./"

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

export function useQueryUserById(userId: string | null) {
  const { data: dataUserById } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId!),
    retry: false,
    enabled: !!userId,
  })

  return {
    user: dataUserById?.data,
  }
}

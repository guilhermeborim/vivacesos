import { useQuery } from "@tanstack/react-query"
import { getUserById } from "./"

export function useQueryUserById(userId: string | null) {
  const { data: dataUserById, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId!),
    retry: false,
    enabled: !!userId,
  })

  return {
    user: dataUserById?.data,
    loadingUserById: isLoading,
  }
}

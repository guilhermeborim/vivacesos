import { useQuery } from "@tanstack/react-query"
import { getInviteByToken } from "./"

export const useQueryInviteByToken = (token: string) => {
  return useQuery({
    queryKey: ["inviteToken"],
    queryFn: () => getInviteByToken(token),
  })
}

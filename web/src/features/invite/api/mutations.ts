import { useQuery } from "@tanstack/react-query";
import { getInviteByToken } from "./routes";

export const useQueryInviteByToken = (token: string) => {
  return useQuery({
    queryKey: ["inviteToken"],
    queryFn: () => getInviteByToken(token),
  });
};

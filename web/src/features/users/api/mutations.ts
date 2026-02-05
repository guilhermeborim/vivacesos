import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RegisterInviteBodySchema } from "../schemas";
import { getUserById, getUsersByClinic, postINvite } from "./routes";

export function useQueryUsers() {
  const { data: dataUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersByClinic,
    retry: false,
  });

  return {
    dataUsers,
  };
}

export function useQueryUserById(userId: string | null) {
  const { data: dataUserById } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId!),
    retry: false,
    enabled: !!userId,
  });

  return {
    user: dataUserById?.data,
  };
}

export const useMutationInvite = () => {
  return useMutation({
    mutationFn: async (payload: RegisterInviteBodySchema) =>
      postINvite(payload),
    onSuccess: async () => {
      toast.success("Convite enviado com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao enviar convite");
      }
    },
  });
};

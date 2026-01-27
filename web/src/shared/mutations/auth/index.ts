import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginFormSchema } from "context/auth/schemas";
import { postLogin, postRegister } from "helpers/backend_helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useMutationLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginFormSchema) => await postLogin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("Conectado com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao autenticar");
      }
    },
  });
}

export function useMutationRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: any) => await postRegister(payload),
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success("Cadastrado com sucesso!");
        navigate("/login");
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao registrar");
      }
    },
  });
}

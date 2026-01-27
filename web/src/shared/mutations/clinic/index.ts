import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateClinicFormSchema } from "features/clinic/schemas";
import { postCreateClinic, postSelectClinic } from "helpers/backend_helper";
import { toast } from "react-toastify";

export const useMutationSelectClinic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clinicId: string) => postSelectClinic(clinicId),
    onSuccess: () => {
      toast.success("Clínica selecionada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Erro ao selecionar Clínica",
        );
      }
    },
  });
};

export const useMutationCreateClinic = () => {
  return useMutation({
    mutationFn: (payload: CreateClinicFormSchema) => postCreateClinic(payload),
    onSuccess: async () => {
      toast.success("Clínica criada com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao criar Clínica");
      }
    },
  });
};

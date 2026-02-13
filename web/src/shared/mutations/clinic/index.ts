import { postCreateClinic, postSelectClinic } from "@/core/api/shared/routes";
import { CreateClinicFormTypeSchema } from "@/features/clinic/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
    mutationFn: (payload: CreateClinicFormTypeSchema) =>
      postCreateClinic(payload),
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

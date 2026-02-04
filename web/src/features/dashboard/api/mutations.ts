import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateProfessionalOnboardingBodySchema } from "features/professional/schemas";
import { toast } from "react-toastify";
import { postCreateProfessionalOnboarding } from "./routes";

export const useMutationCreateProfessionalOnboarding = () => {
  return useMutation({
    mutationFn: async (payload: CreateProfessionalOnboardingBodySchema) =>
      await postCreateProfessionalOnboarding(payload),
    onSuccess: () => {
      toast.success("Profissional criado com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Erro ao criar Profissional",
        );
      }
    },
  });
};

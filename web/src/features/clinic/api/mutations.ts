import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UpdateClinicFormTypeSchema } from "../schemas";
import { getClinicById, getClinicsByUser, putClinicById } from "./routes";

export const useMutationUpdateClinic = (clinicId: string) => {
  return useMutation({
    mutationFn: async (payload: UpdateClinicFormTypeSchema) =>
      putClinicById(clinicId, payload),
    onSuccess: async () => {
      toast.success("Clínica atualizada com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Erro ao atualizar Clínica",
        );
      }
    },
  });
};

export function useQueryClinic() {
  const { data } = useQuery({
    queryKey: ["clinic"],
    queryFn: getClinicsByUser,
    retry: false,
  });

  const dataClinics = data?.data;

  return {
    dataClinics,
  };
}

export function useQueryClinicById(clinicId: string | null) {
  const { data: dataClinicById } = useQuery({
    queryKey: ["clinic", clinicId],
    queryFn: () => getClinicById(clinicId!),
    retry: false,
    enabled: !!clinicId,
  });

  return {
    clinic: dataClinicById?.data,
  };
}

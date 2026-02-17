import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CreatePatientTypeSchema } from "../schemas";
import { getPatientById, getPatients, postPatient } from "./routes";

export function useQueryPatients() {
  const { data } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
    retry: false,
  });

  const dataPatients = data?.data;

  return {
    dataPatients,
  };
}

export function useQuerypatientById(patientId: string | null) {
  const { data: dataPatientById } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatientById(patientId!),
    retry: false,
    enabled: !!patientId,
  });

  return {
    patient: dataPatientById?.data,
  };
}

export const useMutationPatient = () => {
  return useMutation({
    mutationFn: async (payload: CreatePatientTypeSchema) =>
      postPatient(payload),
    onSuccess: async () => {
      toast.success("Paciente cadastrado com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Erro ao cadastrar paciente",
        );
      }
    },
  });
};

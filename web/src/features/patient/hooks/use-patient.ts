import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api, fetcher } from "helpers/api_helper";
import { toast } from "react-toastify";
import { Patient } from "../models/Patient";
import { CreatePatientFormSchema, UpdatePatientFormSchema } from "../schemas";

type UpdatePatientSchema = {
  payload: UpdatePatientFormSchema;
  id: string;
};

type DesativePatientSchema = {
  payload: Patient;
  id: string;
};

export function usePatient() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["patient"],
    queryFn: () => fetcher("/patients", {}),
  });

  const getById = (id: string) =>
    useQuery({
      queryKey: ["patient", id],
      queryFn: () => fetcher(`/patient/${id}`, {}),
      enabled: !!id,
    });

  const create = useMutation({
    mutationFn: async (payload: CreatePatientFormSchema) => {
      try {
        const response = await api.post("/patient", payload);

        if (response.status === 201 && response.data) {
          toast.success("Paciente cadastrado com sucesso!");
          queryClient.invalidateQueries({ queryKey: ["patient"] });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message || "Erro ao criar Paciente");
        }
      }
    },
  });

  const edit = useMutation({
    mutationFn: async ({ id, payload }: UpdatePatientSchema) => {
      try {
        const response = await api.patch(`/patient/${id}`, payload);

        if (response.status === 204) {
          toast.success("Paciente atualizado com sucesso!");
          queryClient.invalidateQueries({ queryKey: ["patient"] });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data.message || "Erro ao atualizar Paciente"
          );
        }
      }
    },
  });

  const desative = useMutation({
    mutationFn: async ({ id, payload }: DesativePatientSchema) => {
      try {
        let status = {
          active: false,
          idpatient: payload.idpatient,
        };

        if (payload.active === false) {
          status.active = true;
        }

        const response = await api.patch(`/patient/${id}`, status);

        if (response.status === 204) {
          toast.success(
            `Paciente ${
              status.active === true ? "ativado" : "desativado"
            } com sucesso!`
          );
          queryClient.invalidateQueries({ queryKey: ["patient"] });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data.message || "Erro ao desativar Paciente"
          );
        }
      }
    },
  });

  return {
    data,
    isLoading,
    create,
    edit,
    getById,
    desative,
  };
}

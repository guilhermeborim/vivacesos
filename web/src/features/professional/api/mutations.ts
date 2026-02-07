import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CreateProfessionalTypeSchema } from "../schemas";
import { getProfessionals, postCreateProfessional } from "./routes";

export const useMutationCreateProfessional = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateProfessionalTypeSchema) =>
      await postCreateProfessional(payload),
    onSuccess: () => {
      toast.success("Profissional criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["professional"] });
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

// export const useMutationUpdateProfessional = (professionalId: string) => {
//   return useMutation({
//     mutationFn: async (payload: UpdateClinicFormTypeSchema) =>
//       putClinicById(professionalId, payload),
//     onSuccess: async () => {
//       toast.success("Clínica atualizada com sucesso!");
//     },
//     onError: (error) => {
//       if (error instanceof AxiosError) {
//         toast.error(
//           error.response?.data.message || "Erro ao atualizar Clínica",
//         );
//       }
//     },
//   });
// };

export function useQueryProfessionals() {
  const { data } = useQuery({
    queryKey: ["professional"],
    queryFn: getProfessionals,
    retry: false,
  });

  const dataProfessionals = data?.data;

  return {
    dataProfessionals,
  };
}

// export function useQueryProfessionalById(professionalId: string | null) {
//   const { data: dataProfessionalById } = useQuery({
//     queryKey: ["clinic", professionalId],
//     queryFn: () => getClinicById(professionalId!),
//     retry: false,
//     enabled: !!professionalId,
//   });

//   return {
//     clinic: dataProfessionalById?.data,
//   };
// }

import { useQuery } from "@tanstack/react-query";
import { getProfessionals } from "./routes";

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
  const { data: dataProfessionals } = useQuery({
    queryKey: ["professional"],
    queryFn: getProfessionals,
    retry: false,
  });

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

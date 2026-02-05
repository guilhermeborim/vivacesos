import { useQueryClient } from "@tanstack/react-query";
import { CreateClinicFormTypeSchema } from "features/clinic/schemas";
import { useMutationCreateClinic } from "shared/mutations/clinic";
import { postNextStep } from "../api/routes";

export const useInitialStepClinic = () => {
  const queryClient = useQueryClient();
  const mutationCreateClinic = useMutationCreateClinic();

  const onSubmitClinic = async (data: CreateClinicFormTypeSchema) => {
    try {
      await mutationCreateClinic.mutateAsync(data);
      await postNextStep({ step: "LINK_PROFESSIONAL" });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    } catch (error) {}
  };

  return {
    onSubmitClinic,
    mutationCreateClinic,
  };
};

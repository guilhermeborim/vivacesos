import { useQueryClient } from "@tanstack/react-query";
import { postNextStep } from "../api/routes";

export const useInitialStepFinished = () => {
  const queryClient = useQueryClient();

  const onSubmitFinishedOnboarding = async () => {
    await postNextStep({ step: "FINISHED" });
    queryClient.invalidateQueries({ queryKey: ["session"] });
  };

  return {
    onSubmitFinishedOnboarding,
  };
};

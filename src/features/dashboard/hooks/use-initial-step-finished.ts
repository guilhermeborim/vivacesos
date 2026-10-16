import { useQueryClient } from "@tanstack/react-query"
import { postNextStep } from "../api"

export const useInitialStepFinished = () => {
  const queryClient = useQueryClient()

  const handleSubmitFinishedOnboarding = async () => {
    await postNextStep({ step: "FINISHED" })
    queryClient.invalidateQueries({ queryKey: ["session"] })
  }

  return {
    actions: {
      handleSubmitFinishedOnboarding,
    },
  }
}

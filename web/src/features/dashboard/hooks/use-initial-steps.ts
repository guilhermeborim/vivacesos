import { CreateNextStepTypeSchema } from "../schemas"

export function useInitialSteps({ step }: CreateNextStepTypeSchema) {
  const activeTab = step === "CREATE_CLINIC" ? 1 : step === "LINK_PROFESSIONAL" ? 2 : 3

  const progressBarValue =
    step === "CREATE_CLINIC" ? 0 : step === "LINK_PROFESSIONAL" ? 50 : 100

  return {
    activeTab,
    progressBarValue,
  }
}

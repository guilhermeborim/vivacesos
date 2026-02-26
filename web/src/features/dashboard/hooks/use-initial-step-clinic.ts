import { CreateClinicFormTypeSchema } from "@/features/clinic/schemas"
import { useMutationCreateClinic } from "@/shared/mutations/clinic"
import { useQueryClient } from "@tanstack/react-query"
import { postNextStep } from "../api/routes"

export const useInitialStepClinic = () => {
  const queryClient = useQueryClient()
  const mutationCreateClinic = useMutationCreateClinic()

  const onSubmitClinic = async (payload: CreateClinicFormTypeSchema) => {
    await mutationCreateClinic.mutateAsync(payload)
    await postNextStep({ step: "LINK_PROFESSIONAL" })
    queryClient.invalidateQueries({ queryKey: ["session"] })
  }

  return {
    onSubmitClinic,
    mutationCreateClinic,
  }
}

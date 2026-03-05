import { useMutationCreateClinic } from "@/shared/mutations/clinic"
import { CreateClinicFormTypeSchema } from "@/shared/schemas"
import { useQueryClient } from "@tanstack/react-query"
import { postNextStep } from "../api"

export const useInitialStepClinic = () => {
  const queryClient = useQueryClient()
  const mutationCreateClinic = useMutationCreateClinic()

  const handleSubmitClinic = async (payload: CreateClinicFormTypeSchema) => {
    await mutationCreateClinic.mutateAsync(payload)
    await postNextStep({ step: "LINK_PROFESSIONAL" })
    queryClient.invalidateQueries({ queryKey: ["session"] })
  }

  return {
    actions: {
      handleSubmitClinic,
      mutationCreateClinic,
    },
    isLoading: {
      isPendingClinic: mutationCreateClinic.isPending,
    },
  }
}

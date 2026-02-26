import { CreateClinicFormTypeSchema } from "@/features/clinic/schemas"
import { useMutationCreateClinic } from "@/shared/mutations/clinic"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { postNextStep } from "../api/routes"

export const useInitialStepClinic = () => {
  const queryClient = useQueryClient()
  const mutationCreateClinic = useMutationCreateClinic()

  const onSubmitClinic = async (payload: CreateClinicFormTypeSchema) => {
    console.log(payload)
    return
    try {
      await mutationCreateClinic.mutateAsync(payload)
      await postNextStep({ step: "LINK_PROFESSIONAL" })
      queryClient.invalidateQueries({ queryKey: ["session"] })
    } catch {
      toast.error("Erro ao criar clínica!")
    }
  }

  return {
    onSubmitClinic,
    mutationCreateClinic,
  }
}

import {
  selectClinicFormSchema,
  SelectClinicFormTypeSchema,
} from "@/features/auth/schemas"
import { useMutationSelectClinic } from "../api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export function useSelectClinic() {
  const queryClient = useQueryClient()
  const mutationSelectClinic = useMutationSelectClinic()
  const formSelectClinic = useForm<SelectClinicFormTypeSchema>({
    resolver: zodResolver(selectClinicFormSchema),
  })

  const handleSubmitSelectClinic = formSelectClinic.handleSubmit(
    async (data: SelectClinicFormTypeSchema) => {
      await mutationSelectClinic.mutateAsync(data.clinicId)
      queryClient.invalidateQueries({ queryKey: ["session"] })
    },
  )

  return {
    actions: {
      formSelectClinic,
      mutationSelectClinic,
      handleSubmitSelectClinic,
    },
    isLoading: {
      isPending: mutationSelectClinic.isPending,
    },
  }
}

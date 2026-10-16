import { useMutationCreateClinic } from "../api/mutations"
import { getCep } from "@/shared/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createClinicFormSchema, CreateClinicFormTypeSchema } from "../schemas"

export const useCreateClinic = () => {
  const [loadingCep, setLoadingCep] = useState<boolean>(false)
  const mutationCreateClinic = useMutationCreateClinic()
  const formCreateClinic = useForm<CreateClinicFormTypeSchema>({
    resolver: zodResolver(createClinicFormSchema),
  })

  const handleSubmitClinicCreate = formCreateClinic.handleSubmit(
    async (data: CreateClinicFormTypeSchema) => {
      await mutationCreateClinic.mutateAsync(data)
    },
  )

  const cep = formCreateClinic.watch("cep")

  useEffect(() => {
    if (cep) {
      getCep({ form: formCreateClinic, cep, setLoadingCep })
    }
  }, [cep, formCreateClinic])

  return {
    actions: {
      formCreateClinic,
      mutationCreateClinic,
      handleSubmitClinicCreate,
    },
    isLoading: {
      loadingCep,
    },
  }
}

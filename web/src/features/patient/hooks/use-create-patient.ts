import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutationPatient } from "../api"
import { createPatientTypeSchema, CreatePatientTypeSchema } from "../schemas"

export const useCreatePatient = () => {
  const mutationPatient = useMutationPatient()
  const [modal, setModal] = useState(false)

  const formCreatePatient = useForm<CreatePatientTypeSchema>({
    resolver: zodResolver(createPatientTypeSchema),
  })

  const toggleModal = () => {
    formCreatePatient.reset()
    setModal(!modal)
  }

  const handleSubmitPatient = formCreatePatient.handleSubmit(
    async (payload: CreatePatientTypeSchema) => {
      try {
        await mutationPatient.mutateAsync(payload)
        toggleModal()
      } catch {
        // Erro já tratado no onError do useMutationPatient
      }
    },
  )

  return {
    data: {
      modal,
    },
    actions: {
      formCreatePatient,
      toggleModal,
      handleSubmitPatient,
    },
    isLoading: {
      isPending: mutationPatient.isPending,
    },
  }
}

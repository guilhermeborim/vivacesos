import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useMutationCreateProfessional } from "../api"
import { CreateProfessionalTypeSchema, createProfessionalSchema } from "../schemas"

export const useCreateProfessional = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const mutationCreateProfessional = useMutationCreateProfessional()

  const formCreateProfessional = useForm<CreateProfessionalTypeSchema>({
    resolver: zodResolver(createProfessionalSchema),
  })
  const toggleModalOpen = () => {
    setModalOpen(!modalOpen)
    formCreateProfessional.reset()
  }

  const handleSubmit = formCreateProfessional.handleSubmit(
    async (payload: CreateProfessionalTypeSchema) => {
      try {
        await mutationCreateProfessional.mutateAsync(payload)
        toggleModalOpen()
      } catch {
        toast.error("Erro ao criar profissional!")
      }
    },
  )

  return {
    actions: {
      toggleModalOpen,
      handleSubmit,
      formCreateProfessional,
    },
    data: {
      modalOpen,
    },
    isLoading: {
      isPending: mutationCreateProfessional.isPending,
    },
  }
}

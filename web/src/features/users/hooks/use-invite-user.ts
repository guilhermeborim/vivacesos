import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutationInvite } from "../api"
import { createInviteSchema, CreateInviteTypeSchema } from "../schemas"

export const useInviteUser = () => {
  // STATES
  const [modalInvite, setModalInvite] = useState<boolean>(false)
  const mutationInvite = useMutationInvite()

  // FORM
  const formInviteUser = useForm<CreateInviteTypeSchema>({
    resolver: zodResolver(createInviteSchema),
  })

  // FUNCTIONS
  const toggleModalInvite = () => {
    setModalInvite(!modalInvite)
    formInviteUser.reset()
  }

  const handleSubmitInvite = formInviteUser.handleSubmit(
    async (payload: CreateInviteTypeSchema) => {
      try {
        await mutationInvite.mutateAsync(payload)
        toggleModalInvite()
      } catch {
        // Erro já tratado no onError do mutationInvite
      }
    },
  )

  return {
    actions: {
      toggleModalInvite,
      formInviteUser,
      handleSubmitInvite,
    },
    data: {
      modalInvite,
    },
    isLoading: {
      isPending: mutationInvite.isPending,
    },
  }
}

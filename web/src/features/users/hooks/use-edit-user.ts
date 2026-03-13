import { Role } from "@/shared/enums"
import { useAuth } from "@/shared/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  useMutationUpdateStatusUser,
  useMutationUpdateUser,
  useQueryUserById,
} from "../api"
import { userColumns } from "../components"
import {
  UpdateStatusUserSchema,
  updateUserSchema,
  UpdateUserTypeSchema,
} from "../schemas"

export const useEditUser = () => {
  const { session } = useAuth()
  const [editUserId, setEditUserId] = useState<string | null>(null)
  const { user, loadingUserById } = useQueryUserById(editUserId)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalInactive, setModalInactive] = useState<boolean>(false)

  const formUpdateUser = useForm<UpdateUserTypeSchema>({
    resolver: zodResolver(updateUserSchema),
  })

  const mutationUpdateUser = useMutationUpdateUser(editUserId!)
  const mutationUpdateStatusUser = useMutationUpdateStatusUser(editUserId!)

  const handleSubmitUpdate = formUpdateUser.handleSubmit(
    async (payload: UpdateUserTypeSchema) => {
      try {
        await mutationUpdateUser.mutateAsync(payload)
        toggleModal()
      } catch {
        // Erro já tratado pelo onError do useMutationUpdateUser
      }
    },
  )

  const handleSubmitUpdateStatus = async (payload: UpdateStatusUserSchema) => {
    try {
      await mutationUpdateStatusUser.mutateAsync(payload)
      toggleModalInactive()
    } catch {
      // Erro já tratado pelo onError do useMutationUpdateUser
    }
  }

  function toggleModal() {
    setModalOpen(!modalOpen)
    setEditUserId(null)
    formUpdateUser.reset()
  }

  function toggleModalInactive() {
    setModalInactive(!modalInactive)
    setEditUserId(null)
  }

  function handleEdit(userId: string) {
    setModalOpen(true)
    setEditUserId(userId)
  }

  function handleInactive(userId: string) {
    setEditUserId(userId)
    setModalInactive(true)
  }

  const columns = userColumns({
    onEdit: handleEdit,
    onInactive: handleInactive,
    onBlock: () => console.log("bloqueou"),
    isAdmin: session?.role === Role.ADMIN,
    currentUserId: session!.user.id,
  })

  return {
    actions: {
      formUpdateUser,
      handleSubmitUpdate,
      handleSubmitUpdateStatus,
      toggleModal,
      toggleModalInactive,
    },
    data: {
      modalOpen,
      modalInactive,
      user,
      columns,
    },
    isLoading: {
      loadingUserById,
      isPending: mutationUpdateUser.isPending,
    },
  }
}

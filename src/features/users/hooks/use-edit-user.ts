import { useAuth, useEditModal } from "@/shared/hooks"
import { useMutationUpdateStatusUser, useMutationUpdateUser } from "../api/mutations"
import { useQueryUserById } from "../api/queries"
import {
  UpdateStatusUserSchema,
  updateUserSchema,
  UpdateUserTypeSchema,
} from "../schemas"

export const useEditUser = () => {
  const { session } = useAuth()
  const modal = useEditModal<UpdateUserTypeSchema>(updateUserSchema)
  const { user, loadingUserById } = useQueryUserById(modal.editId)
  const mutationUpdateUser = useMutationUpdateUser(modal.editId!)
  const mutationUpdateStatusUser = useMutationUpdateStatusUser(modal.editId!)

  return {
    ...modal,
    user,
    loadingUserById,
    currentUserId: session!.user.id,
    isPending: mutationUpdateUser.isPending,
    handleSubmitUpdate: modal.submitUpdate(mutationUpdateUser.mutateAsync),
    handleSubmitUpdateStatus: modal.submitInactive<UpdateStatusUserSchema>(
      mutationUpdateStatusUser.mutateAsync,
    ),
  }
}

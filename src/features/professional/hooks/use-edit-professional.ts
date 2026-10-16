import { useEditModal } from "@/shared/hooks"
import { useMutationUpdateProfessional } from "../api/mutations"
import { useQueryProfessionalById } from "../api/queries"
import { updateProfessionalSchema, UpdateProfessionalTypeSchema } from "../schemas"

export const useEditProfessional = () => {
  const modal = useEditModal<UpdateProfessionalTypeSchema>(updateProfessionalSchema)
  const { professional, loadingProfessionalById } = useQueryProfessionalById(modal.editId)
  const mutation = useMutationUpdateProfessional(modal.editId!)

  return {
    ...modal,
    professional,
    loadingProfessionalById,
    isPending: mutation.isPending,
    handleSubmitUpdate: modal.submitUpdate(mutation.mutateAsync),
    onSubmitInactive: modal.submitInactive<{ active: boolean; id: string }>(mutation.mutateAsync),
  }
}

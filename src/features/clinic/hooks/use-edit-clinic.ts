import { useEditModal } from "@/shared/hooks"
import { useMutationUpdateClinic } from "../api/mutations"
import { useQueryClinicById } from "../api/queries"
import { updateClinicFormSchema, UpdateClinicFormTypeSchema } from "../schemas"

export const useEditClinic = () => {
  const modal = useEditModal<UpdateClinicFormTypeSchema>(updateClinicFormSchema)
  const { clinic, loadingClinicById } = useQueryClinicById(modal.editId)
  const mutation = useMutationUpdateClinic(modal.editId!)

  return {
    ...modal,
    clinic,
    loadingClinicById,
    isPending: mutation.isPending,
    handleSubmitUpdate: modal.submitUpdate(mutation.mutateAsync),
  }
}

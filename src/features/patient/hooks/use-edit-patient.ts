import { useEditModal } from "@/shared/hooks"
import { useMutationUpdatePatient } from "../api/mutations"
import { useQuerypatientById } from "../api/queries"
import { updatePatientSchema, UpdatePatientTypeSchema } from "../schemas"

export const useEditPatient = () => {
  const modal = useEditModal<UpdatePatientTypeSchema>(updatePatientSchema)
  const { patient, loadingPatientById } = useQuerypatientById(modal.editId)
  const mutation = useMutationUpdatePatient(modal.editId!)

  return {
    ...modal,
    patient,
    loadingPatientById,
    isPending: mutation.isPending,
    handleSubmitUpdate: modal.submitUpdate(mutation.mutateAsync),
  }
}

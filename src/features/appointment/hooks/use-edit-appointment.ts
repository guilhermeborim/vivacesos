import { useEditModal } from "@/shared/hooks"
import { useMutationUpdateAppointment } from "../api/mutations"
import { useQueryAppointmentById } from "../api/queries"
import { updateAppointmentSchema, UpdateAppointmentTypeSchema } from "../schemas"

export const useEditAppointment = () => {
  const modal = useEditModal<UpdateAppointmentTypeSchema>(updateAppointmentSchema)
  const { appointment, loadingAppointmentById } = useQueryAppointmentById(modal.editId)
  const mutation = useMutationUpdateAppointment(modal.editId!)

  return {
    ...modal,
    appointment,
    loadingAppointmentById,
    isPending: mutation.isPending,
    handleSubmitUpdate: modal.submitUpdate(mutation.mutateAsync),
  }
}

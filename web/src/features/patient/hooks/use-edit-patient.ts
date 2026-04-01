import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutationUpdatePatient, useQuerypatientById } from "../api"
import { createPatientColumns } from "../components/list/columns"
import { updatePatientSchema, UpdatePatientTypeSchema } from "../schemas"

export const useEditPatient = () => {
  const [editPatientId, setEditPatientId] = useState<string | null>(null)
  const { patient, loadingPatientById } = useQuerypatientById(editPatientId)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const formUpdatePatient = useForm<UpdatePatientTypeSchema>({
    resolver: zodResolver(updatePatientSchema),
  })

  const mutationUpdatePatient = useMutationUpdatePatient(editPatientId!)

  const handleSubmitUpdate = formUpdatePatient.handleSubmit(
    async (payload: UpdatePatientTypeSchema) => {
      try {
        await mutationUpdatePatient.mutateAsync(payload)
        toggleModal()
      } catch {
        // Erro já tratado pelo onError do useMutationUpdatePatient
      }
    },
  )

  function toggleModal() {
    setModalOpen(!modalOpen)
    setEditPatientId(null)
    formUpdatePatient.reset()
  }

  function handleEdit(patientId: string) {
    setModalOpen(true)
    setEditPatientId(patientId)
  }

  const columns = createPatientColumns({
    onEdit: handleEdit,
  })

  return {
    actions: {
      formUpdatePatient,
      handleSubmitUpdate,
      toggleModal,
    },
    data: {
      modalOpen,
      patient,
      columns,
    },
    isLoading: {
      loadingPatientById,
      isPending: mutationUpdatePatient.isPending,
    },
  }
}

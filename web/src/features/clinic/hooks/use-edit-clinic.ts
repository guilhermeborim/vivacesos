import { updateClinicFormSchema, UpdateClinicFormTypeSchema } from "@/shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutationUpdateClinic, useQueryClinicById } from "../api"
import { clinicColumns } from "../components"

export const useEditClinic = () => {
  const [editClinicId, setEditClinicId] = useState<string | null>(null)
  const { clinic, loadingClinicById } = useQueryClinicById(editClinicId)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalInactive, setModalInactive] = useState<boolean>(false)

  const formUpdateClinic = useForm<UpdateClinicFormTypeSchema>({
    resolver: zodResolver(updateClinicFormSchema),
  })

  const mutationUpdateClinic = useMutationUpdateClinic(editClinicId!)

  const handleSubmitUpdate = formUpdateClinic.handleSubmit(
    async (payload: UpdateClinicFormTypeSchema) => {
      try {
        await mutationUpdateClinic.mutateAsync(payload)
        toggleModal()
      } catch {
        // Erro já tratado pelo onError do useMutationUpdateClinic
      }
    },
  )

  const onSubmitInactive = async (payload: { active: boolean; id: string }) => {
    try {
      await mutationUpdateClinic.mutateAsync(payload)
      toggleModalInactive()
    } catch {
      // Erro já tratado pelo onError do useMutationUpdateClinic
    }
  }

  function toggleModal() {
    setModalOpen(!modalOpen)
    setEditClinicId(null)
    formUpdateClinic.reset()
  }

  function toggleModalInactive() {
    setModalInactive(!modalInactive)
    setEditClinicId(null)
  }

  function handleEdit(professionalId: string) {
    setModalOpen(true)
    setEditClinicId(professionalId)
  }

  function handleInactive(professionalId: string) {
    setEditClinicId(professionalId)
    setModalInactive(true)
  }

  const columns = clinicColumns({
    onEdit: handleEdit,
    onInactive: handleInactive,
  })

  return {
    actions: {
      formUpdateClinic,
      handleSubmitUpdate,
      onSubmitInactive,
      toggleModal,
      toggleModalInactive,
    },
    data: {
      modalOpen,
      modalInactive,
      clinic,
      columns,
    },
    isLoading: {
      loadingClinicById,
      isPending: mutationUpdateClinic.isPending,
    },
  }
}

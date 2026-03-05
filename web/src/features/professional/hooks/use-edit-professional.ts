import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutationUpdateProfessional, useQueryProfessionalById } from "../api"
import { professionalColumns } from "../components"
import { updateProfessionalSchema, UpdateProfessionalTypeSchema } from "../schemas"

export const useEditProfessional = () => {
  const [editProfessionalId, setEditProfessionalId] = useState<string | null>(null)
  const { professional, loadingProfessionalById } =
    useQueryProfessionalById(editProfessionalId)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalInactive, setModalInactive] = useState<boolean>(false)

  const formUpdateProfessional = useForm<UpdateProfessionalTypeSchema>({
    resolver: zodResolver(updateProfessionalSchema),
  })

  const mutationUpdateProfessional = useMutationUpdateProfessional(editProfessionalId!)

  const handleSubmitUpdate = formUpdateProfessional.handleSubmit(
    async (payload: UpdateProfessionalTypeSchema) => {
      try {
        await mutationUpdateProfessional.mutateAsync(payload)
        toggleModal()
      } catch {
        // Erro já tratado pelo onError do useMutationUpdateProfessional
      }
    },
  )

  const onSubmitInactive = async (payload: { active: boolean; id: string }) => {
    try {
      await mutationUpdateProfessional.mutateAsync(payload)
      toggleModalInactive()
    } catch {
      // Erro já tratado pelo onError do useMutationUpdateProfessional
    }
  }

  function toggleModal() {
    setModalOpen(!modalOpen)
    setEditProfessionalId(null)
    formUpdateProfessional.reset()
  }

  function toggleModalInactive() {
    setModalInactive(!modalInactive)
    setEditProfessionalId(null)
  }

  function handleEdit(professionalId: string) {
    setModalOpen(true)
    setEditProfessionalId(professionalId)
  }

  function handleInactive(professionalId: string) {
    setEditProfessionalId(professionalId)
    setModalInactive(true)
  }

  const columns = professionalColumns({
    onEdit: handleEdit,
    onInactive: handleInactive,
  })

  return {
    actions: {
      formUpdateProfessional,
      handleSubmitUpdate,
      onSubmitInactive,
      toggleModal,
      toggleModalInactive,
    },
    data: {
      modalOpen,
      modalInactive,
      professional,
      columns,
    },
    isLoading: {
      loadingProfessionalById,
      isPending: mutationUpdateProfessional.isPending,
    },
  }
}

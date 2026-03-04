import { Professional } from "@/shared/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutationUpdateProfessional, useQueryProfessionalById } from "../api"
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

  const onSubmitUpdate = async (payload: UpdateProfessionalTypeSchema) => {
    try {
      await mutationUpdateProfessional.mutateAsync(payload)
      toggleModal()
    } catch {
      // Erro já tratado pelo onError do useMutationUpdateProfessional
    }
  }

  const onSubmitInactive = async ({ active, id }: { active: boolean; id: string }) => {
    const payload = {
      active: active ? false : true,
      id,
    }
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

  function handleInactive(professional: Professional) {
    setEditProfessionalId(professional.id)
    setModalInactive(true)
  }

  return {
    formUpdateProfessional,
    mutationUpdateProfessional,
    onSubmitUpdate,
    handleEdit,
    handleInactive,
    modalOpen,
    modalInactive,
    toggleModal,
    editProfessionalId,
    toggleModalInactive,
    professional,
    loadingProfessionalById,
    onSubmitInactive,
  }
}

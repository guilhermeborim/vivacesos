import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FieldValues, Resolver, useForm } from "react-hook-form"
import { ZodType } from "zod"

export function useFormModal<T extends FieldValues>(
  schema: ZodType<any, any>,
  mutate: (payload: T) => Promise<unknown>,
  onError?: () => void,
) {
  const [modalOpen, setModalOpen] = useState(false)
  const form = useForm<T>({ resolver: zodResolver(schema) as Resolver<T> })

  const toggleModal = () => {
    setModalOpen(!modalOpen)
    form.reset()
  }

  const handleSubmit = form.handleSubmit(async (payload) => {
    try {
      await mutate(payload)
      toggleModal()
    } catch {
      // Erro já tratado no onError da mutation
      onError?.()
    }
  })

  return { form, modalOpen, toggleModal, handleSubmit }
}

export function useEditModal<T extends FieldValues>(schema: ZodType<any, any>) {
  const [editId, setEditId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalInactive, setModalInactive] = useState(false)
  const form = useForm<T>({ resolver: zodResolver(schema) as Resolver<T> })

  const toggleModal = () => {
    setModalOpen(!modalOpen)
    setEditId(null)
    form.reset()
  }

  const toggleModalInactive = () => {
    setModalInactive(!modalInactive)
    setEditId(null)
  }

  const openEdit = (id: string) => {
    setModalOpen(true)
    setEditId(id)
  }

  const openInactive = (id: string) => {
    setEditId(id)
    setModalInactive(true)
  }

  const submitUpdate = (mutate: (payload: T) => Promise<unknown>) =>
    form.handleSubmit(async (payload) => {
      try {
        await mutate(payload)
        toggleModal()
      } catch {
        // Erro já tratado no onError da mutation
      }
    })

  const submitInactive =
    <P>(mutate: (payload: P) => Promise<unknown>) =>
    async (payload: P) => {
      try {
        await mutate(payload)
        toggleModalInactive()
      } catch {
        // Erro já tratado no onError da mutation
      }
    }

  return {
    form,
    editId,
    modalOpen,
    modalInactive,
    toggleModal,
    toggleModalInactive,
    openEdit,
    openInactive,
    submitUpdate,
    submitInactive,
  }
}

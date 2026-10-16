import { FormModal, InputController } from "@/core/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { useMutationCancelEntry } from "../api/mutations"
import { cancelEntrySchema, CancelEntryTypeSchema } from "../schemas"

const MIN_REASON = 5

function CancelFields() {
  const { control, watch } = useFormContext<CancelEntryTypeSchema>()
  const length = (watch("reason") ?? "").trim().length
  return (
    <>
      <p className="text-muted">
        A ficha não é apagada: ela fica no prontuário marcada como cancelada, com a justificativa.
      </p>
      <InputController
        control={control}
        name="reason"
        label="Justificativa"
        type="textarea"
        rows={4}
        placeholder="Explique o motivo do cancelamento"
      />
      <small className={length < MIN_REASON ? "text-danger" : "text-muted"}>
        Mínimo de {MIN_REASON} caracteres ({length}/{MIN_REASON})
      </small>
    </>
  )
}

interface CancelEntryModalProps {
  patientId: string
  entryId: string
  toggle: () => void
}

export function CancelEntryModal({ patientId, entryId, toggle }: CancelEntryModalProps) {
  const mutation = useMutationCancelEntry(patientId)
  const form = useForm<CancelEntryTypeSchema>({
    resolver: zodResolver(cancelEntrySchema),
    mode: "onChange",
  })

  const handleSubmit = form.handleSubmit(async (payload) => {
    try {
      await mutation.mutateAsync({ entryId, ...payload })
      toggle()
    } catch {
      // Erro já tratado no onError da mutation
    }
  })

  return (
    <FormModal
      title="Cancelar ficha"
      submitLabel="Cancelar ficha"
      isOpen
      toggle={toggle}
      form={form}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
    >
      <CancelFields />
    </FormModal>
  )
}

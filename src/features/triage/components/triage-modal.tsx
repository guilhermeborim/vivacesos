import { FormModal } from "@/core/ui"
import { formatDateTime } from "@/shared/utils"
import { useTriageForm } from "../hooks/use-triage-form"
import { TriageFields } from "./triage-fields"

interface TriageModalProps {
  appointmentId: string
  patientName: string
  onClose: () => void
}

/** Triagem feita na agenda (recepção ou profissional). */
export function TriageModal({ appointmentId, patientName, onClose }: TriageModalProps) {
  const { form, triage, submit, isPending } = useTriageForm(appointmentId, onClose)

  return (
    <FormModal
      mode="edit"
      size="lg"
      title={`Triagem — ${patientName}`}
      submitLabel="Salvar triagem"
      isOpen
      toggle={onClose}
      form={form}
      onSubmit={submit}
      isPending={isPending}
    >
      <TriageFields />
      <p className="text-muted fs-12 mt-3 mb-0">
        {triage?.updatedAt &&
          `Atualizada em ${formatDateTime(triage.updatedAt)}${triage.updatedBy ? ` por ${triage.updatedBy.name}` : ""}. `}
        Guarda só o valor atual. Cada leitura e alteração fica registrada na auditoria.
      </p>
    </FormModal>
  )
}

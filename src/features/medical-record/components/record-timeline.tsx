import { MedicalRecordEntry, MedicalRecordTimeline } from "@/shared/types"
import { useState } from "react"
import { CancelEntryModal } from "./cancel-entry-modal"
import { EntryCard } from "./entry-card"

interface RecordTimelineProps {
  timeline: MedicalRecordTimeline | undefined
  canWrite: boolean
  professionalId: string | undefined
}

/** Fichas do paciente, da mais nova para a mais antiga (cada uma começa fechada). */
export function RecordTimeline({ timeline, canWrite, professionalId }: RecordTimelineProps) {
  const [canceling, setCanceling] = useState<MedicalRecordEntry | null>(null)
  const entries = timeline?.entries ?? []

  return (
    <>
      {timeline && entries.length === 0 && (
        <p className="text-muted">Nenhuma ficha registrada neste prontuário.</p>
      )}
      {entries.map((entry) => (
        <EntryCard
          key={entry.entryId}
          entry={entry}
          patientName={timeline?.patient.name ?? ""}
          canWrite={canWrite}
          isMine={entry.professional.professionalId === professionalId}
          onCancel={setCanceling}
        />
      ))}
      {timeline && canceling && (
        <CancelEntryModal
          patientId={timeline.patient.patientId}
          entryId={canceling.entryId}
          toggle={() => setCanceling(null)}
        />
      )}
    </>
  )
}

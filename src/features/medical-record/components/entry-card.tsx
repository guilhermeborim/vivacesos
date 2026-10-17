import { ButtonPrimitive } from "@/core/ui"
import { MedicalRecordEntry } from "@/shared/types"
import { formatDateTime } from "@/shared/utils"
import { useState } from "react"
import { Badge, Card, CardBody, Collapse } from "reactstrap"
import { EntryItems } from "./entry-items"

interface EntryCardProps {
  entry: MedicalRecordEntry
  patientName: string
  canWrite: boolean
  isMine: boolean
  onCancel: (entry: MedicalRecordEntry) => void
}

export function EntryCard({ entry, patientName, canWrite, isMine, onCancel }: EntryCardProps) {
  const canceled = entry.status === "CANCELADA"
  // Histórico começa fechado: só o cabeçalho; clicar expande as informações.
  const [open, setOpen] = useState(false)
  const preview = entry.content.replace(/\s+/g, " ").trim()

  return (
    <Card className="border mb-3">
      <CardBody>
        <button
          type="button"
          className="btn p-0 border-0 bg-transparent w-100 text-start d-flex align-items-start gap-2"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <i
            className={`fs-4 text-muted ${open ? "ri-arrow-down-s-line" : "ri-arrow-right-s-line"}`}
          />
          <div className="flex-grow-1 overflow-hidden">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <h6 className="mb-0">{entry.parentEntryId ? "Adendo (antigo)" : "Ficha"}</h6>
              <Badge color={canceled ? "danger" : "success"}>{entry.status}</Badge>
              <span className="text-muted fs-12">
                {formatDateTime(entry.createdAt)} · {entry.professional.name ?? "-"} · consulta de{" "}
                {formatDateTime(entry.appointment.startsAt)}
              </span>
            </div>
            {!open && (
              <p
                className={`mb-0 mt-1 text-truncate ${
                  canceled ? "text-muted text-decoration-line-through" : "text-muted"
                }`}
              >
                {preview}
              </p>
            )}
          </div>
        </button>

        <Collapse isOpen={open}>
          <div className="mt-3">
            <p
              className={`mb-0 ${canceled ? "text-muted text-decoration-line-through" : ""}`}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {entry.content}
            </p>

            <EntryItems entry={entry} patientName={patientName} />

            {canceled && (
              <div className="alert alert-danger mt-3 mb-0">
                <strong>
                  Cancelada em {entry.canceledAt ? formatDateTime(entry.canceledAt) : "-"}.
                </strong>{" "}
                Justificativa: {entry.cancelReason}
              </div>
            )}

            {canWrite && !canceled && (
              <div className="d-flex gap-2 mt-3">
                {isMine && (
                  <ButtonPrimitive
                    size="sm"
                    variant="danger"
                    outline
                    onClick={() => onCancel(entry)}
                  >
                    Cancelar ficha
                  </ButtonPrimitive>
                )}
              </div>
            )}
          </div>
        </Collapse>
      </CardBody>
    </Card>
  )
}

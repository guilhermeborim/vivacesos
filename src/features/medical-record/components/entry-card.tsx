import { ButtonPrimitive } from "@/core/ui"
import { MedicalRecordEntry } from "@/shared/types"
import { formatDateTime } from "@/shared/utils"
import { Badge, Card, CardBody } from "reactstrap"

interface EntryCardProps {
  entry: MedicalRecordEntry
  isAddendum?: boolean
  canWrite: boolean
  isMine: boolean
  onAddendum?: (entry: MedicalRecordEntry) => void
  onCancel: (entry: MedicalRecordEntry) => void
}

export function EntryCard({
  entry,
  isAddendum = false,
  canWrite,
  isMine,
  onAddendum,
  onCancel,
}: EntryCardProps) {
  const canceled = entry.status === "CANCELADA"

  return (
    <Card className={`border mb-3 ${isAddendum ? "ms-4 border-start border-start-3" : ""}`}>
      <CardBody>
        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
          <h6 className="mb-0">{isAddendum ? "Adendo" : "Ficha"}</h6>
          <Badge color={canceled ? "danger" : "success"}>{entry.status}</Badge>
          <span className="text-muted fs-12">
            {formatDateTime(entry.createdAt)} · {entry.professional.name ?? "-"} · consulta de{" "}
            {formatDateTime(entry.appointment.startsAt)}
          </span>
        </div>

        <p
          className={`mb-0 ${canceled ? "text-muted text-decoration-line-through" : ""}`}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {entry.content}
        </p>

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
            {onAddendum && (
              <ButtonPrimitive size="sm" variant="info" onClick={() => onAddendum(entry)}>
                Adendo
              </ButtonPrimitive>
            )}
            {isMine && (
              <ButtonPrimitive size="sm" variant="danger" outline onClick={() => onCancel(entry)}>
                Cancelar ficha
              </ButtonPrimitive>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

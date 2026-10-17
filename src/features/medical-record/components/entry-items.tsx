import { ButtonPrimitive } from "@/core/ui"
import { MedicalRecordEntry } from "@/shared/types"
import { usePrintContext } from "../hooks/use-print-context"
import { printCertificates, printExams, printPrescriptions, printReferrals } from "../print"
import { describeCertificate, describePrescription } from "../utils-items"

/** Prescrições e exames de uma ficha, em leitura. */
export function EntryItems({
  entry,
  patientName,
}: {
  entry: MedicalRecordEntry
  patientName: string
}) {
  const buildContext = usePrintContext()
  const context = () =>
    buildContext({
      patientName,
      professionalId: entry.professional.professionalId,
      professionalName: entry.professional.name,
      date: entry.createdAt,
    })

  const printButton = (onClick: () => void) => (
    <ButtonPrimitive size="sm" variant="light" className="ms-2" onClick={onClick}>
      <i className="ri-printer-line me-1" />
      Imprimir
    </ButtonPrimitive>
  )

  const prescriptions = entry.prescriptions ?? []
  const exams = entry.exams ?? []
  const certificates = entry.certificates ?? []
  const referrals = entry.referrals ?? []
  if (!prescriptions.length && !exams.length && !certificates.length && !referrals.length) {
    return null
  }

  return (
    <div className="mt-3 pt-3 border-top">
      {prescriptions.length > 0 && (
        <div className="mb-2">
          <strong className="fs-13">
            <i className="ri-capsule-line me-1" />
            Prescrição
          </strong>
          {printButton(() => printPrescriptions(context(), prescriptions))}
          <ul className="mb-0 ps-3">
            {prescriptions.map((p) => (
              <li key={p.itemId}>
                {describePrescription(p)}
                {p.instructions && <small className="text-muted d-block">{p.instructions}</small>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {exams.length > 0 && (
        <div>
          <strong className="fs-13">
            <i className="ri-microscope-line me-1" />
            Exames solicitados
          </strong>
          {printButton(() => printExams(context(), exams))}
          <ul className="mb-0 ps-3">
            {exams.map((x) => (
              <li key={x.itemId}>
                {x.name}
                {x.notes && <small className="text-muted d-block">{x.notes}</small>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {certificates.length > 0 && (
        <div className="mt-2">
          <strong className="fs-13">
            <i className="ri-file-text-line me-1" />
            Atestado
          </strong>
          {printButton(() => printCertificates(context(), certificates))}
          <ul className="mb-0 ps-3">
            {certificates.map((c) => (
              <li key={c.itemId}>
                {describeCertificate(c)}
                {c.cid && <span className="text-muted"> · CID {c.cid}</span>}
                <small className="text-muted d-block" style={{ whiteSpace: "pre-wrap" }}>
                  {c.text}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
      {referrals.length > 0 && (
        <div className="mt-2">
          <strong className="fs-13">
            <i className="ri-share-forward-line me-1" />
            Encaminhamento
          </strong>
          {printButton(() => printReferrals(context(), referrals))}
          <ul className="mb-0 ps-3">
            {referrals.map((r) => (
              <li key={r.itemId}>
                {r.specialty}
                {r.reason && <small className="text-muted d-block">{r.reason}</small>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

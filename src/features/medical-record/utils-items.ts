import { ExamRequest, Prescription } from "@/shared/types"

/** "Dipirona 500 mg · 6/6 horas · 3 dias" */
export function describePrescription(p: Prescription) {
  const dose = [p.dose, p.unit].filter(Boolean).join(" ")
  return [[p.medication, dose].filter(Boolean).join(" "), p.frequency, p.duration]
    .filter(Boolean)
    .join(" · ")
}

export function describeExam(e: ExamRequest) {
  return e.name
}

export function describeCertificate(c: { days?: number; text: string }) {
  return c.days
    ? `Afastamento de ${c.days} dia${c.days > 1 ? "s" : ""}`
    : "Atestado de comparecimento"
}

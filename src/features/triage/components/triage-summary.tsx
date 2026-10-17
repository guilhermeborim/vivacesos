import { useQueryTriage } from "../api/queries"
import { Card, CardBody, Col, Row } from "reactstrap"

/** Resumo só de leitura da triagem, para consulta rápida enquanto escreve a ficha. */
export function TriageSummary({ appointmentId }: { appointmentId: string }) {
  const { triage } = useQueryTriage(appointmentId)
  const t = triage?.triage
  const br = (n: number | null, unit = "") =>
    n === null || n === undefined ? "—" : `${n.toLocaleString("pt-BR")}${unit}`
  const empty = !t || Object.values(t).every((v) => v === null)

  const item = (label: string, value: string) => (
    <Col xs={6}>
      <small className="text-muted d-block">{label}</small>
      <span className="fw-medium">{value}</span>
    </Col>
  )

  return (
    <Card className="border mb-3">
      <CardBody>
        <h6 className="mb-2">
          <i className="ri-stethoscope-line align-middle me-1" />
          Triagem
        </h6>
        {empty ? (
          <p className="text-muted mb-0">Sem triagem registrada para esta consulta.</p>
        ) : (
          <Row className="g-2">
            {item(
              "Pressão",
              t.systolic !== null && t.diastolic !== null
                ? `${t.systolic}/${t.diastolic} mmHg`
                : "—",
            )}
            {item("Batimentos", br(t.heartRate, " bpm"))}
            {item("Temperatura", br(t.temperatureC, " °C"))}
            {item("SpO₂", br(t.spo2, "%"))}
            {item("Respiração", br(t.respiratoryRate, " irpm"))}
            {item("Peso / altura", `${br(t.weightKg, " kg")} / ${br(t.heightCm, " cm")}`)}
            {t.notes && (
              <Col xs={12}>
                <small className="text-muted d-block">Observações</small>
                <span style={{ whiteSpace: "pre-wrap" }}>{t.notes}</span>
              </Col>
            )}
          </Row>
        )}
      </CardBody>
    </Card>
  )
}

import { ButtonPrimitive, FooterAuth } from "@/core/ui"
import { PublicAppointment } from "@/shared/types"
import { formatDateTime } from "@/shared/utils"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import { getPublicAppointment, postPublicCancel, postPublicConfirm } from "../api/routes"

const statusText: Record<string, string> = {
  AGENDADA: "Agendada",
  CONFIRMADA: "Confirmada",
  CANCELADA: "Cancelada",
  CONCLUIDA: "Concluída",
  FALTOU: "Não compareceu",
}

/** Página aberta pelo link enviado ao paciente: confirma ou cancela a consulta, sem login. */
export function AppointmentLinkPage() {
  const { token = "" } = useParams()
  const [appointment, setAppointment] = useState<PublicAppointment | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState<"confirm" | "cancel" | null>(null)
  const [confirmCancel, setConfirmCancel] = useState(false)

  const messageOf = (e: unknown) =>
    e instanceof AxiosError
      ? (e.response?.data?.message ?? "Não foi possível concluir. Tente novamente.")
      : "Não foi possível concluir. Tente novamente."

  useEffect(() => {
    getPublicAppointment(token)
      .then(({ data }) => setAppointment(data))
      .catch((e) => setError(messageOf(e)))
  }, [token])

  const act = async (kind: "confirm" | "cancel") => {
    setPending(kind)
    try {
      const { data } = await (kind === "confirm"
        ? postPublicConfirm(token)
        : postPublicCancel(token))
      setAppointment(data)
      setConfirmCancel(false)
    } catch (e) {
      setError(messageOf(e))
    } finally {
      setPending(null)
    }
  }

  return (
    <FooterAuth>
      <div className="auth-page-content mt-lg-5">
        <Container>
          <Row className="justify-content-center mt-5 pt-5">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4 card-bg-fill">
                <CardBody className="p-4">
                  {error ? (
                    <div className="text-center">
                      <i className="ri-error-warning-line display-5 text-danger" />
                      <h5 className="mt-2">Não foi possível abrir este link</h5>
                      <p className="text-muted mb-0">{error}</p>
                      <p className="text-muted mt-2 mb-0">
                        Em caso de dúvida, entre em contato com a clínica.
                      </p>
                    </div>
                  ) : !appointment ? (
                    <p className="text-center text-muted mb-0">Carregando...</p>
                  ) : (
                    <>
                      <div className="text-center mb-3">
                        <h5 className="text-primary mb-1">{appointment.clinicName}</h5>
                        <p className="text-muted mb-0">Olá, {appointment.patientFirstName}!</p>
                      </div>

                      <div className="border rounded p-3 mb-3">
                        <small className="text-muted d-block">Profissional</small>
                        <p className="fw-medium mb-2">{appointment.professionalName ?? "-"}</p>
                        <small className="text-muted d-block">Data e horário</small>
                        <p className="fw-medium mb-2">{formatDateTime(appointment.startsAt)}</p>
                        <small className="text-muted d-block">Situação</small>
                        <p className="fw-medium mb-0">
                          {statusText[appointment.status] ?? appointment.status}
                        </p>
                      </div>

                      {appointment.message && (
                        <div className="alert alert-success text-center">{appointment.message}</div>
                      )}

                      {appointment.canConfirm && (
                        <ButtonPrimitive
                          className="w-100 mb-2"
                          variant="success"
                          isLoading={pending === "confirm"}
                          disabled={pending !== null}
                          onClick={() => act("confirm")}
                        >
                          Confirmar consulta
                        </ButtonPrimitive>
                      )}

                      {appointment.canCancel &&
                        (confirmCancel ? (
                          <div className="border border-danger rounded p-3">
                            <p className="mb-2">Tem certeza que deseja cancelar esta consulta?</p>
                            <div className="d-flex gap-2">
                              <ButtonPrimitive
                                variant="danger"
                                isLoading={pending === "cancel"}
                                disabled={pending !== null}
                                onClick={() => act("cancel")}
                              >
                                Sim, cancelar
                              </ButtonPrimitive>
                              <ButtonPrimitive
                                variant="light"
                                disabled={pending !== null}
                                onClick={() => setConfirmCancel(false)}
                              >
                                Voltar
                              </ButtonPrimitive>
                            </div>
                          </div>
                        ) : (
                          <ButtonPrimitive
                            className="w-100"
                            variant="danger"
                            outline
                            disabled={pending !== null}
                            onClick={() => setConfirmCancel(true)}
                          >
                            Cancelar consulta
                          </ButtonPrimitive>
                        ))}

                      <p className="text-muted fs-12 text-center mt-3 mb-0">
                        Esta é uma página automática. Para outros assuntos, fale com a clínica.
                      </p>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </FooterAuth>
  )
}

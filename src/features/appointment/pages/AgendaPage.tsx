import { BaseLayout, InfoRules } from "@/core/ui"
import { useQueryAgenda, useQueryAgendaDays } from "../api/queries"
import { AppointmentModals } from "../components/appointment-modals"
import { useAppointmentActions } from "../hooks/use-appointment-actions"
import { useQueryProfessionals } from "@/features/professional/api/queries"
import { useAuth, useMyProfessional } from "@/shared/hooks"
import { TriageModal } from "@/features/triage/components/triage-modal"
import { Appointment, Professional } from "@/shared/types"
import { useEffect, useState } from "react"
import { Card, CardBody, Col, Input, Row } from "reactstrap"
import { BookingModal } from "../components/booking-modal"
import { DayGrid } from "../components/day-grid"
import { MonthCalendar } from "../components/month-calendar"
import "../agenda.css"
import { fromDateKey, minutesLabel, toDateKey, toSlotIso } from "../utils"

export function AgendaPage() {
  const { session, hasPermission } = useAuth()
  const mine = useMyProfessional()
  const { dataProfessionals } = useQueryProfessionals()
  const isProfessionalRole = session?.role === "PROFISSIONAL"

  const [chosen, setChosen] = useState("")
  const [date, setDate] = useState(() => toDateKey(new Date()))
  const [month, setMonth] = useState(() => toDateKey(new Date()).slice(0, 7))
  const [booking, setBooking] = useState<number | null>(null)
  const [triaging, setTriaging] = useState<Appointment["appointment"] | null>(null)

  const activeProfessionals = (dataProfessionals ?? []).filter(
    (p: Professional) => p.professional.active,
  )
  // PROFISSIONAL vê a própria agenda; os demais escolhem (padrão: o próprio perfil, ou o primeiro).
  const professionalId =
    (isProfessionalRole ? mine.professionalId : chosen) ||
    mine.professionalId ||
    activeProfessionals[0]?.professional.professionalId

  useEffect(() => {
    if (!chosen && professionalId) setChosen(professionalId)
  }, [chosen, professionalId])

  const { agenda, loadingAgenda } = useQueryAgenda(professionalId, date)
  const { agendaDays } = useQueryAgendaDays(professionalId, month)
  const actions = useAppointmentActions()

  const selectDate = (value: string) => {
    setDate(value)
    setMonth(value.slice(0, 7))
  }

  const title = fromDateKey(date).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  })

  return (
    <BaseLayout.Root title="Agendas" pageTitle="Recepção">
      <BaseLayout.Header isFilters={false} />
      <BaseLayout.Body>
        <>
          <InfoRules
            rules={[
              "Escolha o dia no calendário: verde tem horário livre, cinza não tem. O botão “Hoje” volta para o dia atual.",
              "Clique num horário livre para agendar. Cada horário tem o tamanho da duração de consulta do profissional (Profissionais da Saúde → Editar).",
              "Horário cinza escrito “Horário fechado” está fora do atendimento do profissional (Minha agenda); nele não se agenda.",
              "Borda azul: consulta marcada. Verde: paciente que já chegou. Cinza com “Concluída”: consulta feita, que continua ocupando o horário.",
              "Passe o mouse na consulta para ver as ações. Agendada: Confirmou ou Cancelou. Confirmada: Chegou, Cancelou ou Faltou. Chegou: Triagem, Concluir ou Cancelou. O menu ⋯ tem Editar e WhatsApp (agendada), Editar (confirmada) e Valor e Pagamento (chegou ou concluída).",
              "Cancelar ou marcar Faltou libera o horário. Quem já chegou não pode ser marcado como Faltou.",
              "Em consulta concluída só o valor e o pagamento mudam, e o valor só enquanto não estiver pago.",
              "“Triagem” registra pressão, batimentos, temperatura e outros sinais da consulta; o profissional vê tudo na hora de atender. Cada leitura e alteração fica na auditoria.",
              "Quem chegou aparece na lista “Do Dia” do profissional, que inicia o atendimento por lá.",
              "Os horários de atendimento vêm de Configurações → Minha agenda (ou Profissionais da Saúde → Horários de atendimento). Quem atende em qualquer horário aparece com o expediente padrão das 07:00 às 19:00.",
            ]}
          />
          <Row className="g-3">
            <Col lg={4} xl={3}>
              <Card>
                <CardBody>
                  {!isProfessionalRole && (
                    <Input
                      type="select"
                      className="mb-3"
                      aria-label="Profissional"
                      value={professionalId ?? ""}
                      onChange={(e) => setChosen(e.target.value)}
                    >
                      {activeProfessionals.map((p: Professional) => (
                        <option
                          key={p.professional.professionalId}
                          value={p.professional.professionalId}
                        >
                          {p.professional.name} - {p.professional.specialty}
                        </option>
                      ))}
                    </Input>
                  )}
                  <MonthCalendar
                    selected={date}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={selectDate}
                    onToday={() => selectDate(toDateKey(new Date()))}
                    days={agendaDays}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg={8} xl={9}>
              <Card>
                <CardBody>
                  <h5 className="text-capitalize mb-3">{title}</h5>
                  {!professionalId && <p className="text-muted mb-0">Nenhum profissional ativo.</p>}
                  {professionalId && agenda && (
                    <DayGrid
                      date={date}
                      agenda={agenda}
                      actions={actions}
                      onBook={setBooking}
                      onTriage={hasPermission("TRIAGE_MANAGE") ? setTriaging : undefined}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <AppointmentModals actions={actions} />
          {triaging && (
            <TriageModal
              appointmentId={triaging.appointmentId}
              patientName={triaging.patient.name}
              onClose={() => setTriaging(null)}
            />
          )}
          {booking !== null && professionalId && (
            <BookingModal
              professionalId={professionalId}
              startsAt={toSlotIso(date, booking)}
              label={`${title}, ${minutesLabel(booking)}`}
              onClose={() => setBooking(null)}
            />
          )}
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

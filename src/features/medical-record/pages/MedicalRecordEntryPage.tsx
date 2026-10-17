import {
  BaseLayout,
  ButtonPrimitive,
  InfoRules,
  InputController,
  SelectController,
} from "@/core/ui"
import { useQueryAppointments } from "@/features/appointment/api/queries"
import { useMutationUpdateAppointmentStatus } from "@/features/appointment/api/mutations"
import { AppointmentStatus } from "@/shared/enums"
import { useAuth, useMyProfessional } from "@/shared/hooks"
import { formatDateTime } from "@/shared/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePrintContext } from "../hooks/use-print-context"
import { printCertificates, printExams, printPrescriptions, printReferrals } from "../print"
import { TriagePanel } from "@/features/triage/components/triage-panel"
import { TriageSummary } from "@/features/triage/components/triage-summary"
import { useEffect, useMemo, useRef, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Card, CardBody, Col, Input, Label, Nav, NavItem, NavLink, Row } from "reactstrap"
import { useMutationEntry } from "../api/mutations"
import { useQueryMedicalRecordByPatient, useQueryRecordTemplates } from "../api/queries"
import { ClinicalProfileCard } from "../components/clinical-profile-card"
import { CertificatesTab, ExamsTab, PrescriptionsTab, ReferralsTab } from "../components/order-tabs"
import { RecordTimeline } from "../components/record-timeline"
import {
  CertificateFormOutput,
  createEntrySchema,
  CreateEntryTypeSchema,
  ExamFormOutput,
  PrescriptionFormOutput,
  ReferralFormOutput,
} from "../schemas"
import { applyTemplate } from "../utils"

/**
 * Atendimento em tela dividida: à esquerda a consulta, o modelo e os dados básicos
 * para consulta rápida; à direita o texto da ficha; no rodapé, concluir a consulta e registrar.
 */
export function MedicalRecordEntryPage() {
  const { patientId } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { hasPermission } = useAuth()
  const {
    professionalId,
    name,
    isProfessional,
    isLoading: loadingProfessional,
  } = useMyProfessional()
  const { timeline, loadingTimeline } = useQueryMedicalRecordByPatient(patientId)
  const { dataAppointments } = useQueryAppointments()
  const { templates } = useQueryRecordTemplates()
  const mutation = useMutationEntry(patientId ?? "")
  const mutationStatus = useMutationUpdateAppointmentStatus()
  const buildPrintContext = usePrintContext()

  const [tab, setTab] = useState<"ficha" | "triagem" | "historico">("ficha")
  const [subTab, setSubTab] = useState<"prescricao" | "exames" | "atestados" | "encaminhamentos">(
    "prescricao",
  )
  const [prescriptions, setPrescriptions] = useState<PrescriptionFormOutput[]>([])
  const [exams, setExams] = useState<ExamFormOutput[]>([])
  const [certificates, setCertificates] = useState<CertificateFormOutput[]>([])
  const [referrals, setReferrals] = useState<ReferralFormOutput[]>([])
  /** Modal de item aberto (um por vez). */
  const [adding, setAdding] = useState<typeof subTab | null>(null)

  const form = useForm<CreateEntryTypeSchema>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      appointmentId: params.get("appointmentId") ?? undefined,
    },
  })

  // Consulta ativa já tem ficha: não aparece de novo (cancelar a ficha libera a consulta).
  const usedAppointmentIds = useMemo(
    () =>
      new Set(
        (timeline?.entries ?? [])
          .filter((e) => e.status === "ATIVA")
          .map((e) => e.appointment.appointmentId),
      ),
    [timeline],
  )

  const activeEntries = useMemo(
    () => (timeline?.entries ?? []).filter((e) => e.status === "ATIVA"),
    [timeline],
  )

  // Consulta concluída só volta a receber ficha para corrigir uma ficha cancelada.
  const canceledAppointmentIds = useMemo(
    () =>
      new Set(
        (timeline?.entries ?? [])
          .filter((e) => e.status === "CANCELADA" && !e.parentEntryId)
          .map((e) => e.appointment.appointmentId),
      ),
    [timeline],
  )

  const appointmentOptions = useMemo(
    () =>
      (dataAppointments ?? [])
        .filter(
          (a) =>
            a.appointment.patient.patientId === patientId &&
            a.appointment.professional.professionalId === professionalId &&
            (a.appointment.status === AppointmentStatus.CONFIRMADA ||
              a.appointment.status === AppointmentStatus.CHEGOU ||
              (a.appointment.status === AppointmentStatus.CONCLUIDA &&
                canceledAppointmentIds.has(a.appointment.appointmentId))) &&
            !usedAppointmentIds.has(a.appointment.appointmentId),
        )
        .map((a) => ({
          label: `${formatDateTime(a.appointment.startsAt)} — ${a.appointment.status}`,
          value: a.appointment.appointmentId,
          startsAt: a.appointment.startsAt,
        })),
    [dataAppointments, patientId, professionalId, usedAppointmentIds, canceledAppointmentIds],
  )

  // useWatch (e não form.watch) garante a nova renderização também quando o valor é preenchido
  // por código (consulta vinda da URL ou escolhida por padrão).
  const selectedAppointment = useWatch({ control: form.control, name: "appointmentId" })
  const content = useWatch({ control: form.control, name: "content" })

  // Consulta padrão (uma vez, sem sobrescrever a escolha): se só há uma, ela; se há várias, a de
  // hoje; se nenhuma é de hoje, o campo fica vazio.
  const defaultApplied = useRef(false)
  useEffect(() => {
    if (defaultApplied.current || !dataAppointments || !timeline) return
    if (!professionalId) return
    defaultApplied.current = true
    if (form.getValues("appointmentId")) return // veio pela URL
    const today = new Date().toLocaleDateString("sv-SE")
    const pick =
      appointmentOptions.length === 1
        ? appointmentOptions[0]
        : appointmentOptions
            .filter((o) => new Date(o.startsAt).toLocaleDateString("sv-SE") === today)
            .sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0]
    if (pick) form.setValue("appointmentId", pick.value, { shouldValidate: true })
  }, [dataAppointments, timeline, professionalId, appointmentOptions, form])
  useEffect(() => {
    // Consulta da URL que não está mais disponível (já tem ficha, não é sua...) é descartada, mas só
    // depois de carregar o perfil do profissional (antes disso a lista de consultas vem vazia).
    if (
      selectedAppointment &&
      dataAppointments &&
      timeline &&
      professionalId &&
      !appointmentOptions.some((o) => o.value === selectedAppointment)
    ) {
      form.setValue("appointmentId", undefined)
    }
  }, [selectedAppointment, dataAppointments, timeline, professionalId, appointmentOptions, form])

  if (!hasPermission("RECORD_WRITE") || (!loadingProfessional && !isProfessional)) {
    return <Navigate to="/error-403" replace />
  }

  const patient = timeline?.patient
  const backTo = `/medical-record/${patientId}`

  const handleTemplate = (templateId: string) => {
    const template = templates?.find((t) => t.templateId === templateId)
    if (!template || !patient) return
    form.setValue(
      "content",
      applyTemplate(template.content, { paciente: patient.name, profissional: name }),
      { shouldValidate: true },
    )
  }

  const handleSubmit = form.handleSubmit(async (payload) => {
    if (!payload.appointmentId) {
      form.setError("appointmentId", { message: "Selecione a consulta" })
      return
    }
    const entry = payload
    try {
      await mutation.mutateAsync({ ...entry, prescriptions, exams, certificates, referrals })
    } catch {
      // Erro já tratado no onError da mutation
      return
    }
    // Registrar a ficha conclui a consulta (exceto na correção de uma consulta já concluída).
    // A ficha já foi registrada; falha ao concluir não a desfaz (erro tratado na mutation).
    const alreadyDone =
      dataAppointments?.find((a) => a.appointment.appointmentId === entry.appointmentId)
        ?.appointment.status === AppointmentStatus.CONCLUIDA
    if (entry.appointmentId && !alreadyDone) {
      try {
        await mutationStatus.mutateAsync({
          appointmentId: entry.appointmentId,
          status: AppointmentStatus.CONCLUIDA,
        })
      } catch {
        // Erro já tratado no onError da mutation
      }
    }
    navigate(backTo)
  })

  const pending = mutation.isPending || mutationStatus.isPending
  // Obrigatórios: consulta escolhida e texto da ficha (a API exige os dois).
  const canRegister = !!selectedAppointment && !!content?.trim() && content.length <= 20000
  const printContext = () =>
    buildPrintContext({ patientName: patient?.name ?? "", professionalId, professionalName: name })

  return (
    <BaseLayout.Root title="Atendimento" pageTitle="Atendimento">
      <BaseLayout.Header isFilters={false} />
      <BaseLayout.Body>
        <>
          <InfoRules
            rules={[
              "O atendimento tem as abas Ficha, Triagem (sinais vitais da consulta escolhida) e Histórico (fichas anteriores do paciente). Abaixo do texto da ficha ficam Prescrição, Exames, Atestados e Encaminhamentos, sem sair da tela. O que você digitou continua ao trocar de aba.",
              "Prescrições, exames, atestados e encaminhamentos adicionados são gravados junto com a ficha, ao Registrar, e passam a fazer parte dela: não podem ser editados nem apagados (só se a ficha for cancelada). Dá para imprimir cada um.",
              "Só aparecem consultas confirmadas ou com o paciente presente, suas, deste paciente e que ainda não têm ficha ativa (mais as concluídas cuja ficha foi cancelada).",
              "O botão Registrar só é liberado com a consulta escolhida e o texto da ficha preenchido.",
              "O modelo é apenas um texto inicial: você pode editar tudo antes de registrar.",
              "Os dados básicos à esquerda são para consulta rápida; edite-os pelo botão Editar.",
              "Depois de registrada, a ficha não pode ser editada nem apagada; só cancelada, com justificativa. Se registrou algo errado, cancele e registre de novo.",
              "Ao registrar a ficha, a consulta é concluída automaticamente. Se a ficha for cancelada por erro, a consulta concluída volta a aceitar uma nova ficha.",
            ]}
          />

          {patient && (
            <h5 className="mb-3">
              {patient.name}
              {!patient.active && <small className="text-muted ms-2">(paciente inativo)</small>}
            </h5>
          )}

          <Nav tabs className="mb-3">
            {(
              [
                ["ficha", "Ficha"],
                ["triagem", "Triagem"],
                ["historico", "Histórico"],
              ] as [typeof tab, string][]
            ).map(([key, label]) => (
              <NavItem key={key}>
                <NavLink
                  href="#"
                  active={tab === key}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setTab(key)
                  }}
                >
                  {label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>

          {tab === "triagem" && (
            <div className="mb-3">
              {selectedAppointment ? (
                <TriagePanel appointmentId={selectedAppointment} />
              ) : (
                <p className="text-muted">Escolha a consulta na aba Ficha para ver a triagem.</p>
              )}
            </div>
          )}

          {tab === "historico" && (
            <RecordTimeline
              timeline={timeline}
              canWrite={hasPermission("RECORD_WRITE")}
              professionalId={professionalId}
            />
          )}

          {/* Sem <form>: os modais de prescrição etc. propagariam o submit para a ficha. */}
          <div className={tab === "ficha" ? "" : "d-none"}>
            <Row className="g-3">
              <Col lg={4}>
                <Card className="border mb-3">
                  <CardBody>
                    <Row className="gap-3">
                      <Col lg={12}>
                        <SelectController
                          control={form.control}
                          name="appointmentId"
                          label="Consulta"
                          options={appointmentOptions}
                          placeholder={
                            appointmentOptions.length
                              ? "Selecione a consulta..."
                              : "Nenhuma consulta confirmada sem ficha"
                          }
                        />
                      </Col>
                      {!!templates?.length && (
                        <Col lg={12}>
                          <Label className="form-label" htmlFor="template-select">
                            Modelo (opcional)
                          </Label>
                          <Input
                            id="template-select"
                            type="select"
                            defaultValue=""
                            onChange={(e) => handleTemplate(e.target.value)}
                          >
                            <option value="">Texto livre</option>
                            {templates.map((t) => (
                              <option key={t.templateId} value={t.templateId}>
                                {t.name}
                              </option>
                            ))}
                          </Input>
                        </Col>
                      )}
                    </Row>
                  </CardBody>
                </Card>

                {selectedAppointment && <TriageSummary appointmentId={selectedAppointment} />}
                {patientId && <ClinicalProfileCard patientId={patientId} canEdit compact />}
              </Col>

              <Col lg={8}>
                <Card className="border mb-3">
                  <CardBody>
                    <InputController
                      control={form.control}
                      name="content"
                      label="Ficha"
                      type="textarea"
                      rows={14}
                      placeholder="Escreva a ficha da consulta"
                    />
                  </CardBody>
                </Card>

                <Card className="border">
                  <CardBody>
                    <Nav pills className="mb-3 gap-1">
                      {(
                        [
                          ["prescricao", "Prescrição", prescriptions.length],
                          ["exames", "Exames", exams.length],
                          ["atestados", "Atestados", certificates.length],
                          ["encaminhamentos", "Encaminhamentos", referrals.length],
                        ] as [typeof subTab, string, number][]
                      ).map(([key, label, count]) => (
                        <NavItem key={key}>
                          <NavLink
                            href="#"
                            active={subTab === key}
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault()
                              setSubTab(key)
                            }}
                          >
                            {label}
                            {count > 0 && (
                              <span className="badge bg-primary-subtle text-primary ms-1">
                                {count}
                              </span>
                            )}
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>

                    {subTab === "prescricao" && (
                      <PrescriptionsTab
                        items={prescriptions}
                        onAdd={(item) => setPrescriptions((prev) => [...prev, item])}
                        onRemove={(i) =>
                          setPrescriptions((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        history={activeEntries}
                        adding={adding === "prescricao"}
                        setAdding={(open) => setAdding(open ? "prescricao" : null)}
                        onPrint={() => printPrescriptions(printContext(), prescriptions)}
                      />
                    )}
                    {subTab === "exames" && (
                      <ExamsTab
                        items={exams}
                        onAdd={(item) => setExams((prev) => [...prev, item])}
                        onRemove={(i) => setExams((prev) => prev.filter((_, idx) => idx !== i))}
                        history={activeEntries}
                        adding={adding === "exames"}
                        setAdding={(open) => setAdding(open ? "exames" : null)}
                        onPrint={() => printExams(printContext(), exams)}
                      />
                    )}
                    {subTab === "atestados" && (
                      <CertificatesTab
                        items={certificates}
                        onAdd={(item) => setCertificates((prev) => [...prev, item])}
                        onRemove={(i) =>
                          setCertificates((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        history={activeEntries}
                        adding={adding === "atestados"}
                        setAdding={(open) => setAdding(open ? "atestados" : null)}
                        onPrint={() => printCertificates(printContext(), certificates)}
                      />
                    )}
                    {subTab === "encaminhamentos" && (
                      <ReferralsTab
                        items={referrals}
                        onAdd={(item) => setReferrals((prev) => [...prev, item])}
                        onRemove={(i) => setReferrals((prev) => prev.filter((_, idx) => idx !== i))}
                        history={activeEntries}
                        adding={adding === "encaminhamentos"}
                        setAdding={(open) => setAdding(open ? "encaminhamentos" : null)}
                        onPrint={() => printReferrals(printContext(), referrals)}
                      />
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 border-top mt-3 pt-3">
            <div className="text-muted">
              <i className="ri-information-line me-1" />
              Ao registrar a ficha, a consulta é <strong>concluída automaticamente</strong> e sai da
              Sala de Espera.
            </div>
            <div className="d-flex gap-2">
              <Link to={backTo} className="btn btn-light">
                Cancelar
              </Link>
              <ButtonPrimitive
                type="button"
                onClick={handleSubmit}
                isLoading={pending}
                disabled={!canRegister}
              >
                Registrar
              </ButtonPrimitive>
            </div>
          </div>
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

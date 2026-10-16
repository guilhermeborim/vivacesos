import {
  BaseLayout,
  ButtonPrimitive,
  CheckController,
  InfoRules,
  InputController,
  Loading,
  SelectController,
} from "@/core/ui"
import { useQueryAppointments } from "@/features/appointment/api/queries"
import { useMutationUpdateAppointmentStatus } from "@/features/appointment/api/mutations"
import { AppointmentStatus } from "@/shared/enums"
import { useAuth, useMyProfessional } from "@/shared/hooks"
import { formatDateTime } from "@/shared/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useRef } from "react"
import { useForm } from "react-hook-form"
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Card, CardBody, Col, Input, Label, Row } from "reactstrap"
import { useMutationEntry } from "../api/mutations"
import { useQueryMedicalRecordByPatient, useQueryRecordTemplates } from "../api/queries"
import { ClinicalProfileCard } from "../components/clinical-profile-card"
import { createEntrySchema, CreateEntryTypeSchema } from "../schemas"
import { applyTemplate } from "../utils"

/**
 * Nova ficha (ou adendo) em tela dividida: à esquerda a consulta, o modelo e os dados básicos
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

  const parentEntryId = params.get("parentEntryId") ?? undefined
  const parent = timeline?.entries.find((e) => e.entryId === parentEntryId)
  const isAddendum = !!parentEntryId

  const form = useForm<CreateEntryTypeSchema>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      appointmentId: params.get("appointmentId") ?? undefined,
      parentEntryId,
      concludeAppointment: false,
    },
  })

  // Consulta ativa já tem ficha: não aparece de novo (cancelar a ficha libera; adendo complementa).
  const usedAppointmentIds = useMemo(
    () =>
      new Set(
        (timeline?.entries ?? [])
          .filter((e) => e.status === "ATIVA")
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
            a.appointment.status === AppointmentStatus.CONFIRMADA &&
            !usedAppointmentIds.has(a.appointment.appointmentId),
        )
        .map((a) => ({
          label: `${formatDateTime(a.appointment.startsAt)} — ${a.appointment.status}`,
          value: a.appointment.appointmentId,
          startsAt: a.appointment.startsAt,
        })),
    [dataAppointments, patientId, professionalId, usedAppointmentIds],
  )

  // Consulta da URL que não está mais disponível (já tem ficha, não é sua...) é descartada.
  const selectedAppointment = form.watch("appointmentId")

  // Consulta padrão (uma vez, sem sobrescrever a escolha): se só há uma, ela; se há várias, a de
  // hoje; se nenhuma é de hoje, o campo fica vazio.
  const defaultApplied = useRef(false)
  useEffect(() => {
    if (defaultApplied.current || isAddendum || !dataAppointments || !timeline) return
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
  }, [isAddendum, dataAppointments, timeline, professionalId, appointmentOptions, form])
  useEffect(() => {
    if (
      !isAddendum &&
      selectedAppointment &&
      dataAppointments &&
      timeline &&
      !appointmentOptions.some((o) => o.value === selectedAppointment)
    ) {
      form.setValue("appointmentId", undefined)
    }
  }, [isAddendum, selectedAppointment, dataAppointments, timeline, appointmentOptions, form])

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
    if (!isAddendum && !payload.appointmentId) {
      form.setError("appointmentId", { message: "Selecione a consulta" })
      return
    }
    const { concludeAppointment, ...entry } = payload
    try {
      await mutation.mutateAsync(entry)
    } catch {
      // Erro já tratado no onError da mutation
      return
    }
    // A ficha já foi registrada; falha ao concluir não a desfaz (erro tratado na mutation).
    if (concludeAppointment && entry.appointmentId) {
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

  return (
    <BaseLayout.Root title={isAddendum ? "Novo adendo" : "Nova ficha"} pageTitle="Prontuários">
      <BaseLayout.Header isFilters={false}>
        <Link to={backTo} className="btn btn-light">
          Voltar
        </Link>
      </BaseLayout.Header>
      <BaseLayout.Body>
        <>
          {loadingTimeline && <Loading loading />}
          <InfoRules
            rules={
              isAddendum
                ? [
                    "O adendo complementa a ficha original e usa a mesma consulta.",
                    "Depois de registrado, não pode ser editado ou apagado; só cancelado, com justificativa.",
                  ]
                : [
                    "Só aparecem consultas confirmadas, suas, deste paciente e que ainda não têm ficha ativa.",
                    "O modelo é apenas um texto inicial: você pode editar tudo antes de registrar.",
                    "Os dados básicos à esquerda são para consulta rápida; edite-os pelo botão Editar.",
                    "Depois de registrada, a ficha não pode ser editada nem apagada; só cancelada, com justificativa.",
                    "Com “Concluir consulta” ligado, a consulta vira CONCLUÍDA logo após registrar a ficha.",
                  ]
            }
          />

          {patient && (
            <h5 className="mb-3">
              {patient.name}
              {!patient.active && <small className="text-muted ms-2">(paciente inativo)</small>}
            </h5>
          )}

          <form onSubmit={handleSubmit} id="entry-form">
            <Row className="g-3">
              <Col lg={4}>
                <Card className="border mb-3">
                  <CardBody>
                    {isAddendum ? (
                      <>
                        <h6 className="mb-2">Ficha original</h6>
                        {parent ? (
                          <>
                            <small className="text-muted d-block mb-1">
                              {formatDateTime(parent.createdAt)} · {parent.professional.name ?? "-"}
                            </small>
                            <p className="mb-0 fs-13" style={{ whiteSpace: "pre-wrap" }}>
                              {parent.content}
                            </p>
                          </>
                        ) : (
                          <p className="text-muted mb-0">Carregando…</p>
                        )}
                      </>
                    ) : (
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
                    )}
                  </CardBody>
                </Card>

                {patientId && <ClinicalProfileCard patientId={patientId} canEdit compact />}
              </Col>

              <Col lg={8}>
                <Card className="border h-100">
                  <CardBody>
                    <InputController
                      control={form.control}
                      name="content"
                      label={isAddendum ? "Adendo" : "Ficha"}
                      type="textarea"
                      rows={18}
                      placeholder={
                        isAddendum
                          ? "Escreva o complemento da ficha original"
                          : "Escreva a ficha da consulta"
                      }
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </form>

          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 border-top mt-3 pt-3">
            <div>
              {!isAddendum && (
                <CheckController
                  control={form.control}
                  name="concludeAppointment"
                  label="Concluir consulta"
                  variant="switch"
                />
              )}
            </div>
            <div className="d-flex gap-2">
              <Link to={backTo} className="btn btn-light">
                Cancelar
              </Link>
              <ButtonPrimitive type="submit" form="entry-form" isLoading={pending}>
                Registrar
              </ButtonPrimitive>
            </div>
          </div>
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

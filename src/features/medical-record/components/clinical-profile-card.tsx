import { ButtonPrimitive, FormModal, InputController, SelectController } from "@/core/ui"
import { formatDateTime } from "@/shared/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { Badge, Card, CardBody, Col, Row } from "reactstrap"
import { useMutationClinicalProfile } from "../api/mutations"
import { useQueryClinicalProfile } from "../api/queries"
import {
  ClinicalProfileFormOutput,
  ClinicalProfileFormValues,
  clinicalProfileFormSchema,
} from "../schemas"
import { bmiLabel, calcBmi, diabetesLabel } from "../utils-clinical"

function ProfileFields() {
  const { control } = useFormContext<ClinicalProfileFormValues>()

  return (
    <Row className="gap-3">
      <Col md={5}>
        <InputController
          control={control}
          name="heightCm"
          label="Altura (cm)"
          type="number"
          step="0.1"
          placeholder="Ex.: 172"
        />
      </Col>
      <Col md={5}>
        <InputController
          control={control}
          name="weightKg"
          label="Peso (kg)"
          type="number"
          step="0.01"
          placeholder="Ex.: 70,5"
        />
      </Col>
      <Col lg={12}>
        <SelectController
          control={control}
          name="diabetes"
          label="Diabetes"
          options={[
            { label: "Sim", value: "SIM" },
            { label: "Não", value: "NAO" },
            { label: "N/A (não se aplica / não informado)", value: "NA" },
          ]}
        />
      </Col>
      <Col lg={12}>
        <InputController
          control={control}
          name="drugAllergies"
          label="Alergia a medicamentos"
          type="textarea"
          rows={2}
          placeholder="Ex.: dipirona, penicilina"
        />
      </Col>
      <Col lg={12}>
        <InputController
          control={control}
          name="otherInfo"
          label="Outras informações"
          type="textarea"
          rows={3}
          placeholder="Ex.: hipertenso, gestante, uso contínuo de..."
        />
      </Col>
    </Row>
  )
}

interface ClinicalProfileCardProps {
  patientId: string
  canEdit: boolean
  /** Versão enxuta para o painel lateral da ficha. */
  compact?: boolean
}

/** Dados básicos de saúde do paciente: consulta rápida e edição (somente o valor atual). */
export function ClinicalProfileCard({
  patientId,
  canEdit,
  compact = false,
}: ClinicalProfileCardProps) {
  const [editing, setEditing] = useState(false)
  const { clinicalProfile } = useQueryClinicalProfile(patientId)
  const mutation = useMutationClinicalProfile(patientId)
  const form = useForm<ClinicalProfileFormValues, unknown, ClinicalProfileFormOutput>({
    resolver: zodResolver(clinicalProfileFormSchema),
  })

  const p = clinicalProfile?.profile
  const bmi = calcBmi(p?.heightCm ?? null, p?.weightKg ?? null)
  const empty =
    !p || (!p.heightCm && !p.weightKg && !p.diabetes && !p.drugAllergies && !p.otherInfo)

  const openEdit = () => {
    form.reset({
      heightCm: p?.heightCm ?? "",
      weightKg: p?.weightKg ?? "",
      diabetes: p?.diabetes ?? null,
      drugAllergies: p?.drugAllergies ?? "",
      otherInfo: p?.otherInfo ?? "",
    })
    setEditing(true)
  }

  const submit = form.handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync({
        heightCm: values.heightCm,
        weightKg: values.weightKg,
        diabetes: values.diabetes ?? null,
        drugAllergies: values.drugAllergies,
        otherInfo: values.otherInfo,
      })
      setEditing(false)
    } catch {
      // Erro já tratado no onError da mutation
    }
  })

  const item = (label: string, value: React.ReactNode) => (
    <div className={compact ? "mb-2" : ""}>
      <small className="text-muted d-block">{label}</small>
      <span className="fw-medium">{value ?? "—"}</span>
    </div>
  )

  return (
    <>
      <Card className="border mb-3">
        <CardBody>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="mb-0">
              <i className="ri-heart-pulse-line align-middle me-1" />
              Dados básicos
            </h6>
            {canEdit && (
              <ButtonPrimitive size="sm" variant="light" onClick={openEdit}>
                <i className="ri-pencil-line align-bottom me-1" />
                Editar
              </ButtonPrimitive>
            )}
          </div>

          {empty ? (
            <p className="text-muted mb-0">Nenhuma informação cadastrada ainda.</p>
          ) : (
            <Row className="g-2">
              <Col xs={compact ? 6 : 6} md={compact ? 6 : 3}>
                {item("Altura", p?.heightCm ? `${p.heightCm.toLocaleString("pt-BR")} cm` : null)}
              </Col>
              <Col xs={6} md={compact ? 6 : 3}>
                {item("Peso", p?.weightKg ? `${p.weightKg.toLocaleString("pt-BR")} kg` : null)}
              </Col>
              <Col xs={6} md={compact ? 6 : 3}>
                {item(
                  "IMC",
                  bmi !== null ? (
                    <>
                      {bmi.toLocaleString("pt-BR")}{" "}
                      <small className="text-muted fw-normal">({bmiLabel(bmi)})</small>
                    </>
                  ) : null,
                )}
              </Col>
              <Col xs={6} md={compact ? 6 : 3}>
                {item(
                  "Diabetes",
                  p?.diabetes ? (
                    <Badge color={p.diabetes === "SIM" ? "danger" : "secondary"}>
                      {diabetesLabel[p.diabetes]}
                    </Badge>
                  ) : null,
                )}
              </Col>
              <Col xs={12}>
                {item(
                  "Alergia a medicamentos",
                  p?.drugAllergies ? <span className="text-danger">{p.drugAllergies}</span> : null,
                )}
              </Col>
              <Col xs={12}>{item("Outras informações", p?.otherInfo)}</Col>
            </Row>
          )}

          {clinicalProfile?.updatedAt && (
            <small className="text-muted d-block mt-2">
              Atualizado em {formatDateTime(clinicalProfile.updatedAt)}
              {clinicalProfile.updatedBy && ` por ${clinicalProfile.updatedBy.name}`}
            </small>
          )}
        </CardBody>
      </Card>

      {editing && (
        <FormModal
          mode="edit"
          size="lg"
          title="Dados básicos do paciente"
          submitLabel="Salvar"
          isOpen
          toggle={() => setEditing(false)}
          form={form}
          onSubmit={submit}
          isPending={mutation.isPending}
        >
          <ProfileFields />
          <p className="text-muted fs-12 mt-3 mb-0">
            Guarda só o valor atual (não há histórico de medições). Cada leitura e alteração fica
            registrada na auditoria.
          </p>
        </FormModal>
      )}
    </>
  )
}

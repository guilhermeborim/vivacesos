import { InputController, SelectController } from "@/core/ui"
import { useAuth } from "@/shared/hooks"
import { Professional, User } from "@/shared/types"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import { fields } from "./fields"

interface FormProfessionalProps {
  defaultValues?: Professional
  users?: User[]
  isEdit?: boolean
}

export function FormProfessional({
  defaultValues,
  users = [],
  isEdit = false,
}: FormProfessionalProps) {
  const { hasPermission } = useAuth()
  const { watch, control, reset, setValue } = useFormContext()
  // Na edição o tipo vem aninhado em `professional`; no cadastro é o campo `type` do formulário.
  const type = watch(isEdit ? "professional.type" : "type")

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        ...defaultValues.professional,
        // Campo numérico não aceita null; ausente (não ADMIN) continua ausente.
        payoutPercent:
          defaultValues.professional.payoutPercent === undefined
            ? undefined
            : (defaultValues.professional.payoutPercent ?? ""),
      })
    }
  }, [defaultValues, reset])

  useEffect(() => {
    if (!isEdit) setValue("type", "MEDICO")
  }, [isEdit, setValue])

  return (
    <Row className="gap-3">
      {!isEdit && (
        <Col lg={12}>
          <SelectController
            control={control}
            name="userId"
            options={
              users?.map((user) => ({
                label: user.user.name,
                value: user.user.userId,
              })) ?? []
            }
            label="Selecione o Usuário"
          />
        </Col>
      )}
      {type &&
        fields.map((field) => (
          <Col lg={12} key={field.name}>
            {field.type === "select" ? (
              <SelectController
                control={control}
                name={field.name}
                options={field.options ?? []}
                label={field.label}
              />
            ) : (
              <InputController
                control={control}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                minLength={field.minLength}
                maxLength={field.maxLength}
              />
            )}
          </Col>
        ))}
      {isEdit && hasPermission("PROFESSIONAL_UPDATE") && (
        <Col lg={12}>
          <InputController
            control={control}
            name="appointmentDurationMinutes"
            label="Duração da consulta (min)"
            type="number"
            min={5}
            max={240}
            step={5}
            placeholder="Ex.: 30"
          />
          <small className="text-muted">
            Tamanho de cada horário na agenda e fim sugerido ao agendar. De 5 em 5 minutos.
          </small>
        </Col>
      )}
      {isEdit && hasPermission("PROFESSIONAL_UPDATE") && (
        <Col lg={12}>
          <InputController
            control={control}
            name="payoutPercent"
            label="Percentual do repasse (%)"
            type="number"
            min={0}
            max={100}
            step="0.01"
            placeholder="Ex.: 40"
          />
          <small className="text-muted">
            Usado como padrão ao lançar o repasse e para estimar o que o profissional vai receber.
          </small>
        </Col>
      )}
    </Row>
  )
}

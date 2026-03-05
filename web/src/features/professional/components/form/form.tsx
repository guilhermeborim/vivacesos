import { InputController, SelectController } from "@/core/ui"
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
  const { watch, control, reset } = useFormContext()
  const type = watch("type")

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

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
    </Row>
  )
}

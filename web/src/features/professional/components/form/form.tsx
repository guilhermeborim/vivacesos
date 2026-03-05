import { InputController, SelectController } from "@/core/ui"
import { Professional, User } from "@/shared/types"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

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
    <>
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
        <Col lg={12}>
          <SelectController
            control={control}
            name="type"
            options={[
              { label: "Médico", value: "MEDICO" },
              {
                label: "Mais categorias em breve!",
                value: "",
                isDisabled: true,
              },
            ]}
            label="Tipo de Profissional"
          />
        </Col>
        {type && (
          <>
            <Col lg={12}>
              <InputController
                control={control}
                name="crm"
                label="CRM"
                placeholder="CRM do Profissional"
                minLength={5}
                maxLength={10}
              />
            </Col>
            <Col lg={12}>
              <InputController
                control={control}
                name="specialty"
                label="Especialidade"
                placeholder="Especialidade do Profissional"
              />
            </Col>
          </>
        )}
      </Row>
    </>
  )
}

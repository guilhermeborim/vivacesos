import { InputController, SelectController } from "@/core/ui"
import { User } from "@/shared/types"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

interface FormUserProps {
  defaultValues?: User
  isEdit?: boolean
}

export function FormUser({ defaultValues, isEdit = false }: FormUserProps) {
  const { control, reset } = useFormContext()

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.user.name,
        email: defaultValues.user.email,
      })
    }
  }, [defaultValues, reset])

  return (
    <>
      <Row>
        <Col lg={isEdit ? 12 : 6}>
          {!isEdit && (
            <InputController
              label="E-mail"
              control={control}
              name={"email"}
              placeholder="example@example.com"
            />
          )}
          <InputController
            label="Nome"
            control={control}
            name={"name"}
            placeholder="Nome do usuário"
          />
        </Col>
        {!isEdit && (
          <Col lg={6}>
            <SelectController
              control={control}
              name="role"
              options={[
                { label: "Profissional", value: "PROFISSIONAL" },
                { label: "Recepcionista", value: "RECEPCIONISTA" },
              ]}
              label="Cargo"
            />
          </Col>
        )}
      </Row>
    </>
  )
}

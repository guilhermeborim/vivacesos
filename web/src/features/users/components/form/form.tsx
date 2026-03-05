import { InputController, SelectController } from "@/core/ui"
import { User } from "@/shared/types"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import { editFields, inviteFields } from "./fields"

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

  if (isEdit) {
    return (
      <Row>
        {editFields.map((field) => (
          <Col lg={12} key={field.name}>
            <InputController
              control={control}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
            />
          </Col>
        ))}
      </Row>
    )
  }
  return (
    <Row>
      {inviteFields.map((field) => (
        <Col lg={6} key={field.name}>
          {field.type === "select" ? (
            <SelectController
              control={control}
              name={field.name}
              placeholder={field.placeholder}
              label={field.label}
              options={field.options ?? []}
            />
          ) : (
            <InputController
              control={control}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
            />
          )}
        </Col>
      ))}
    </Row>
  )
}

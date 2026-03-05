import { InputController } from "@/core/ui"
import { Patient } from "@/shared/types"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import { fields } from "./fields"

interface FormPatientProps {
  defaultValues?: Patient
}

export function FormPatient({ defaultValues }: FormPatientProps) {
  const { control, reset } = useFormContext()

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  return (
    <Row>
      {fields.map((field) => (
        <Col md={field.md} className="mt-3" key={field.name}>
          {field.type !== "select" && (
            <InputController
              label={field.label}
              control={control}
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
              mask={field.mask}
            />
          )}
        </Col>
      ))}
    </Row>
  )
}

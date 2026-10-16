import { InputController, SelectController } from "@/core/ui"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import { fields } from "./fields"

export function FormProfessionalOnboarding() {
  const { control } = useFormContext()

  return (
    <Row className="gap-3">
      {fields.map((field) => (
        <Col lg={3} key={field.name}>
          {field.type === "select" ? (
            <SelectController
              control={control}
              name={field.name}
              options={field.options ?? []}
              label={field.label}
              disabled={field.disabled}
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

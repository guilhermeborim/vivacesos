import { InputController } from "@/core/ui"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import { fields } from "./fields"

export function FormInvite() {
  const { control } = useFormContext()

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
            />
          )}
        </Col>
      ))}
    </Row>
  )
}

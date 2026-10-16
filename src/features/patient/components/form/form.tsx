import { InputController } from "@/core/ui"
import { FieldConfig } from "@/shared/forms"
import { Patient } from "@/shared/types"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import { CreatePatientTypeSchema } from "../../schemas"

const fields: FieldConfig<CreatePatientTypeSchema>[] = [
  { name: "name", label: "Nome", placeholder: "Nome completo", md: 3, type: "text" },
  {
    name: "email",
    label: "E-mail",
    placeholder: "example@example.com",
    md: 3,
    type: "text",
  },
  {
    name: "cpf",
    label: "CPF",
    placeholder: "000.000.000-00",
    md: 3,
    type: "text",
    mask: "999.999.999-99",
    minLength: 11,
    maxLength: 14,
  },
  {
    name: "phone",
    label: "Telefone",
    placeholder: "(00) 00000-0000",
    md: 3,
    type: "text",
    mask: "(99) 99999-9999",
    minLength: 11,
    maxLength: 15,
  },
  { name: "birthDate", label: "Nascimento", md: 3, type: "date" },
]

interface FormPatientProps {
  defaultValues?: Patient
}

export function FormPatient({ defaultValues }: FormPatientProps) {
  const { control, reset } = useFormContext()

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues.patients)
    }
  }, [defaultValues, reset])

  return (
    <Row>
      {fields.map((field) => (
        <Col md={field.md} className="mt-3" key={field.name}>
          <InputController
            label={field.label}
            control={control}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            mask={field.mask}
          />
        </Col>
      ))}
    </Row>
  )
}

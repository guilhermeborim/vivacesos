import { InputController, SelectController } from "@/core/ui"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

/** Etapa 2 do convite: perfil profissional (vira o cadastro em Profissionais da Saúde). */
export function FormProfessionalStep() {
  const { control } = useFormContext()

  return (
    <Row className="gap-3">
      <Col lg={12}>
        <SelectController
          control={control}
          name="professional.type"
          label="Tipo de Profissional"
          options={[{ label: "Médico", value: "MEDICO" }]}
          isClearable={false}
          disabled
        />
      </Col>
      <Col lg={12}>
        <InputController
          control={control}
          name="professional.crm"
          label="CRM"
          placeholder="CRM do Profissional"
          maxLength={10}
        />
      </Col>
      <Col lg={12}>
        <InputController
          control={control}
          name="professional.specialty"
          label="Especialidade"
          placeholder="Especialidade do Profissional"
          maxLength={30}
        />
      </Col>
    </Row>
  )
}

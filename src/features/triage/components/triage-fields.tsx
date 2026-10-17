import { InputController } from "@/core/ui"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import { TriageFormValues } from "../schemas"

export function TriageFields() {
  const { control } = useFormContext<TriageFormValues>()

  return (
    <Row className="g-3">
      <Col xs={6} md={3}>
        <InputController
          control={control}
          name="systolic"
          label="Pressão máx. (mmHg)"
          type="number"
          placeholder="120"
        />
      </Col>
      <Col xs={6} md={3}>
        <InputController
          control={control}
          name="diastolic"
          label="Pressão mín. (mmHg)"
          type="number"
          placeholder="80"
        />
      </Col>
      <Col xs={6} md={3}>
        <InputController
          control={control}
          name="heartRate"
          label="Batimentos (bpm)"
          type="number"
          placeholder="72"
        />
      </Col>
      <Col xs={6} md={3}>
        <InputController
          control={control}
          name="respiratoryRate"
          label="Respiração (irpm)"
          type="number"
          placeholder="16"
        />
      </Col>
      <Col xs={6} md={3}>
        <InputController
          control={control}
          name="temperatureC"
          label="Temperatura (°C)"
          type="number"
          step="0.1"
          placeholder="36,5"
        />
      </Col>
      <Col xs={6} md={3}>
        <InputController
          control={control}
          name="spo2"
          label="Saturação SpO₂ (%)"
          type="number"
          placeholder="98"
        />
      </Col>
      <Col xs={6} md={3}>
        <InputController
          control={control}
          name="weightKg"
          label="Peso (kg)"
          type="number"
          step="0.01"
          placeholder="70,5"
        />
      </Col>
      <Col xs={6} md={3}>
        <InputController
          control={control}
          name="heightCm"
          label="Altura (cm)"
          type="number"
          step="0.1"
          placeholder="172"
        />
      </Col>
      <Col xs={12}>
        <InputController
          control={control}
          name="notes"
          label="Observações da triagem"
          type="textarea"
          rows={3}
          maxLength={2000}
          placeholder="Queixa principal, sintomas relatados..."
        />
      </Col>
    </Row>
  )
}

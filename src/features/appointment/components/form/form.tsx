import {
  InputController,
  PriceController,
  SelectController,
} from "@/core/ui"
import { useQueryPatients } from "@/features/patient/api/queries"
import { useQueryProfessionals } from "@/features/professional/api/queries"
import { Appointment, Patient, Professional } from "@/shared/types"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import { addOneHour, toLocalInput } from "../../utils"

interface FormAppointmentProps {
  defaultValues?: Appointment
  isEdit?: boolean
  /** Consulta já concluída: só o valor pode mudar. */
  billingOnly?: boolean
}

export function FormAppointment({
  defaultValues,
  isEdit = false,
  billingOnly = false,
}: FormAppointmentProps) {
  const { control, reset, setValue, watch } = useFormContext()
  const startsAt = watch("startsAt")
  const { dataPatients } = useQueryPatients()
  const { dataProfessionals } = useQueryProfessionals()

  useEffect(() => {
    if (defaultValues) {
      const { startsAt, endsAt, notes, price } = defaultValues.appointment
      reset(
        billingOnly
          ? { price }
          : {
              startsAt: toLocalInput(startsAt),
              endsAt: toLocalInput(endsAt),
              notes,
              price,
            },
      )
    }
  }, [defaultValues, billingOnly, reset])

  useEffect(() => {
    if (!isEdit && startsAt && !isNaN(new Date(startsAt).getTime())) {
      setValue("endsAt", addOneHour(startsAt), { shouldValidate: true })
    }
  }, [startsAt, isEdit, setValue])

  return (
    <Row className="gap-3">
      {!isEdit && (
        <>
          <Col lg={12}>
            <SelectController
              control={control}
              name="patientId"
              label="Paciente"
              options={(dataPatients ?? [])
                .filter((p: Patient) => p.patients.active)
                .map((p: Patient) => ({
                  label: p.patients.name,
                  value: p.patients.patientId,
                }))}
            />
          </Col>
          <Col lg={12}>
            <SelectController
              control={control}
              name="professionalId"
              label="Profissional"
              options={(dataProfessionals ?? [])
                .filter((p: Professional) => p.professional.active)
                .map((p: Professional) => ({
                  label: `${p.professional.name} - ${p.professional.specialty}`,
                  value: p.professional.professionalId,
                }))}
            />
          </Col>
        </>
      )}
      {!billingOnly && (
        <>
          <Col lg={6}>
            <InputController
              control={control}
              name="startsAt"
              label="Início"
              type="datetime-local"
            />
          </Col>
          <Col lg={6}>
            <InputController
              control={control}
              name="endsAt"
              label="Fim"
              type="datetime-local"
            />
          </Col>
        </>
      )}
      <Col lg={6}>
        <PriceController control={control} name="price" label="Valor" />
      </Col>
      {!billingOnly && (
        <Col lg={12}>
          <InputController
            control={control}
            name="notes"
            label="Observações"
            type="textarea"
            maxLength={2000}
          />
        </Col>
      )}
    </Row>
  )
}

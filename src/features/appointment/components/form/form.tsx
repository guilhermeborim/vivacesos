import { InputController, PriceController, SelectController } from "@/core/ui"
import { useQueryPatients } from "@/features/patient/api/queries"
import { useQueryAvailability, useQueryProfessionals } from "@/features/professional/api/queries"
import { Appointment, Patient, Professional } from "@/shared/types"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Col, Input, Label, Row } from "reactstrap"
import { useQuerySlots } from "../../api/queries"
import { addMinutes, toLocalInput } from "../../utils"

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

  // Profissional com horários restritos: escolhe data + horário livre em vez de digitar a hora.
  const professionalId: string | undefined = isEdit
    ? defaultValues?.appointment.professional.professionalId
    : watch("professionalId")
  const { availability } = useQueryAvailability(professionalId)
  const restricted = !!availability?.restricted
  const [slotDate, setSlotDate] = useState("")
  const [slotValue, setSlotValue] = useState("")
  const { slots, loadingSlots } = useQuerySlots(professionalId, slotDate, restricted)

  // Trocar de profissional descarta data/horário escolhidos para o anterior.
  useEffect(() => {
    if (isEdit) return
    setSlotDate("")
    setSlotValue("")
    setValue("startsAt", "")
    setValue("endsAt", "")
  }, [professionalId, isEdit, setValue])

  const timeLabel = (iso: string) =>
    new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

  const pickSlot = (startsAtIso: string) => {
    setSlotValue(startsAtIso)
    const slot = slots.find((s) => s.startsAt === startsAtIso)
    if (!slot) return
    setValue("startsAt", toLocalInput(slot.startsAt), { shouldValidate: true })
    setValue("endsAt", toLocalInput(slot.endsAt), { shouldValidate: true })
  }

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

  // Fim sugerido = início + duração padrão do profissional (1 h se ainda não escolheu).
  const durationMinutes =
    dataProfessionals?.find((p: Professional) => p.professional.professionalId === professionalId)
      ?.professional.appointmentDurationMinutes ?? 60
  useEffect(() => {
    if (!isEdit && startsAt && !isNaN(new Date(startsAt).getTime())) {
      setValue("endsAt", addMinutes(startsAt, durationMinutes), { shouldValidate: true })
    }
  }, [startsAt, durationMinutes, isEdit, setValue])

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
      {!billingOnly && restricted && (
        <>
          <Col lg={6}>
            <Label className="form-label" htmlFor="slot-date">
              Data
            </Label>
            <Input
              id="slot-date"
              type="date"
              min={new Date().toLocaleDateString("sv-SE")}
              value={slotDate}
              onChange={(e) => {
                setSlotDate(e.target.value)
                setSlotValue("")
              }}
            />
          </Col>
          <Col lg={6}>
            <Label className="form-label" htmlFor="slot-time">
              Horário
            </Label>
            <Input
              id="slot-time"
              type="select"
              value={slotValue}
              disabled={!slotDate || loadingSlots}
              onChange={(e) => pickSlot(e.target.value)}
            >
              <option value="">
                {!slotDate
                  ? "Escolha a data primeiro"
                  : loadingSlots
                    ? "Buscando horários..."
                    : slots.length
                      ? isEdit
                        ? "Manter o horário atual"
                        : "Selecione o horário"
                      : "Sem horários livres nesta data"}
              </option>
              {slots.map((s) => (
                <option key={s.startsAt} value={s.startsAt}>
                  {timeLabel(s.startsAt)} – {timeLabel(s.endsAt)}
                </option>
              ))}
            </Input>
            <small className="text-muted">
              Só aparecem os horários em que o profissional atende e que ainda estão livres.
            </small>
          </Col>
        </>
      )}
      {!billingOnly && !restricted && (
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
            <InputController control={control} name="endsAt" label="Fim" type="datetime-local" />
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

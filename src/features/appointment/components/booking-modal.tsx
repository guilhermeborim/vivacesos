import { FormModal, InputController, PriceController, SelectController } from "@/core/ui"
import { useQueryPatients } from "@/features/patient/api/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Patient } from "@/shared/types"
import { useForm } from "react-hook-form"
import { Col, Row } from "reactstrap"
import { useMutationAgendaBooking } from "../api/mutations"
import { agendaBookingSchema, AgendaBookingTypeSchema } from "../schemas"

interface BookingModalProps {
  professionalId: string
  /** ISO do início do horário escolhido. */
  startsAt: string
  label: string
  onClose: () => void
}

/** Agenda no horário clicado: só falta escolher o paciente e o valor. */
export function BookingModal({ professionalId, startsAt, label, onClose }: BookingModalProps) {
  const { dataPatients } = useQueryPatients()
  const mutation = useMutationAgendaBooking()
  const form = useForm<AgendaBookingTypeSchema>({ resolver: zodResolver(agendaBookingSchema) })

  const onSubmit = form.handleSubmit(async (payload) => {
    try {
      await mutation.mutateAsync({ ...payload, professionalId, startsAt })
      onClose()
    } catch {
      // Erro já tratado no onError da mutation
    }
  })

  return (
    <FormModal
      title={`Agendar — ${label}`}
      submitLabel="Agendar"
      isOpen
      toggle={onClose}
      form={form}
      onSubmit={onSubmit}
      isPending={mutation.isPending}
    >
      <Row className="gap-3">
        <Col lg={12}>
          <SelectController
            control={form.control}
            name="patientId"
            label="Paciente"
            options={(dataPatients ?? [])
              .filter((p: Patient) => p.patients.active)
              .map((p: Patient) => ({ label: p.patients.name, value: p.patients.patientId }))}
          />
        </Col>
        <Col lg={6}>
          <PriceController control={form.control} name="price" label="Valor" />
        </Col>
        <Col lg={12}>
          <InputController
            control={form.control}
            name="notes"
            label="Observações"
            type="textarea"
            maxLength={2000}
          />
        </Col>
      </Row>
    </FormModal>
  )
}

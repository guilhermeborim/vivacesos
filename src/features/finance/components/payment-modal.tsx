import { CheckController, FormModal, SelectController } from "@/core/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import { paymentSchema, PaymentTypeSchema } from "../schemas"
import { paymentMethodOptions } from "../utils"

function PaymentFields() {
  const { control, watch } = useFormContext<PaymentTypeSchema>()
  const paid = watch("paid")

  return (
    <Row className="gap-3">
      <Col lg={12}>
        <CheckController control={control} name="paid" label="Pago" variant="switch" />
      </Col>
      {paid && (
        <Col lg={12}>
          <SelectController
            control={control}
            name="paymentMethod"
            label="Forma de pagamento"
            options={paymentMethodOptions}
          />
        </Col>
      )}
    </Row>
  )
}

interface PaymentModalProps {
  isOpen: boolean
  toggle: () => void
  title: string
  initial?: PaymentTypeSchema
  onSubmit: (payload: PaymentTypeSchema) => Promise<unknown>
  isPending: boolean
}

export function PaymentModal({
  isOpen,
  toggle,
  title,
  initial = { paid: false },
  onSubmit,
  isPending,
}: PaymentModalProps) {
  const form = useForm<PaymentTypeSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: initial,
  })

  const handleSubmit = form.handleSubmit(async (payload) => {
    try {
      await onSubmit(payload)
      toggle()
    } catch {
      // Erro já tratado no onError da mutation
    }
  })

  return (
    <FormModal
      mode="edit"
      title={title}
      submitLabel="Salvar"
      isOpen={isOpen}
      toggle={toggle}
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
    >
      <PaymentFields />
    </FormModal>
  )
}

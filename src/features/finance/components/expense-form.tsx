import { InputController, PriceController } from "@/core/ui"
import { Expense } from "@/shared/types"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

export function ExpenseForm({ defaultValues }: { defaultValues?: Expense }) {
  const { control, reset } = useFormContext()

  useEffect(() => {
    if (defaultValues) {
      const { description, category, amount, dueDate, notes } = defaultValues
      reset({ description, category, amount, dueDate, notes })
    }
  }, [defaultValues, reset])

  return (
    <Row className="gap-3">
      <Col lg={12}>
        <InputController control={control} name="description" label="Descrição" maxLength={255} />
      </Col>
      <Col lg={6}>
        <InputController control={control} name="category" label="Categoria" maxLength={100} />
      </Col>
      <Col lg={6}>
        <InputController control={control} name="dueDate" label="Vencimento" type="date" />
      </Col>
      <Col lg={6}>
        <PriceController control={control} name="amount" label="Valor" />
      </Col>
      <Col lg={12}>
        <InputController control={control} name="notes" label="Observações" type="textarea" maxLength={2000} />
      </Col>
    </Row>
  )
}

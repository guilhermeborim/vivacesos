import { InputController, PriceController, SelectController } from "@/core/ui"
import { useQuerySettings } from "@/features/settings/api/queries"
import { Expense } from "@/shared/types"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

const recurrenceOptions = [
  { label: "Não repete", value: "NONE" },
  { label: "Diária", value: "DAILY" },
  { label: "Semanal", value: "WEEKLY" },
  { label: "Quinzenal", value: "BIWEEKLY" },
  { label: "Mensal", value: "MONTHLY" },
]

interface ExpenseFormProps {
  defaultValues?: Expense
}

export function ExpenseForm({ defaultValues }: ExpenseFormProps) {
  const { control, reset, watch } = useFormContext()
  const { settings } = useQuerySettings()
  const isEdit = !!defaultValues
  // Recorrência só no cadastro e com a opção ligada em Configurações.
  const showRecurrence = !isEdit && !!settings?.recurringExpensesEnabled
  const recurrence = watch("recurrence")

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
      {showRecurrence && (
        <>
          <Col lg={6}>
            <SelectController
              control={control}
              name="recurrence"
              label="Recorrência"
              options={recurrenceOptions}
              isClearable={false}
              placeholder="Não repete"
            />
          </Col>
          {recurrence && recurrence !== "NONE" && (
            <Col lg={12}>
              <InputController
                control={control}
                name="recurrenceEndsAt"
                label="Repetir até (opcional)"
                type="date"
              />
              <small className="text-muted">
                No dia de cada vencimento o sistema cria uma nova despesa pendente igual a esta.
              </small>
            </Col>
          )}
        </>
      )}
      <Col lg={12}>
        <InputController
          control={control}
          name="notes"
          label="Observações"
          type="textarea"
          maxLength={2000}
        />
      </Col>
    </Row>
  )
}

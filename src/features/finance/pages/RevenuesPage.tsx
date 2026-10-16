import { BaseLayout, DropdownComponent, FormModal, TableList } from "@/core/ui"
import { useMutationAppointmentPayment } from "@/features/appointment/api/mutations"
import { useAuth, useFormModal } from "@/shared/hooks"
import { Revenue } from "@/shared/types"
import { formatCurrency, formatDateTime } from "@/shared/utils"
import { useMemo, useState } from "react"
import { Badge } from "reactstrap"
import { useMutationExpense } from "../api/mutations"
import { useQueryRevenues } from "../api/queries"
import { ExpenseForm } from "../components/expense-form"
import { Filters } from "../components/filters"
import { Payout } from "../components/payout"
import { PaymentModal } from "../components/payment-modal"
import { Totals } from "../components/totals"
import { useProfessionalFilter } from "../hooks"
import { expenseSchema, ExpenseTypeSchema, FinanceFilters } from "../schemas"
import { currentMonthFilters, paymentMethodLabel, toPaymentPayload } from "../utils"

export function RevenuesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission("FINANCE_MANAGE")
  const [filters, setFilters] = useState<FinanceFilters>(currentMonthFilters)
  const [editing, setEditing] = useState<Revenue | null>(null)
  const { totals, revenues } = useQueryRevenues(filters)
  const mutation = useMutationAppointmentPayment()
  const { options: professionals } = useProfessionalFilter()
  const professional = professionals?.find((p) => p.value === filters.professionalId)

  const mutationExpense = useMutationExpense()
  const expense = useFormModal<ExpenseTypeSchema>(expenseSchema, mutationExpense.mutateAsync)
  const openPayoutExpense = (amount: number) => {
    expense.toggleModal()
    expense.form.reset({
      description: `PAGAMENTO PROFISSIONAL ${professional?.label.toUpperCase()}`,
      category: "Repasse profissional",
      amount,
      dueDate: new Date().toLocaleDateString("sv-SE"),
    })
  }

  const columns = useMemo(
    () =>
      TableList.Columns<Revenue>({
        columns: [
          TableList.Column<Revenue>({
            header: "Data",
            accessorFn: (row) => formatDateTime(row.startsAt),
          }),
          TableList.Column<Revenue>({
            header: "Paciente",
            accessorFn: (row) => row.patient.name,
          }),
          TableList.Column<Revenue>({
            header: "Profissional",
            accessorFn: (row) => row.professional.name,
          }),
          TableList.Column<Revenue>({
            header: "Valor",
            accessorFn: (row) => formatCurrency(row.price),
          }),
          TableList.Column<Revenue>({
            header: "Pagamento",
            accessorFn: (row) => (row.paid ? "Pago" : "Pendente"),
            cell: (row) =>
              row.paid ? (
                <Badge color="success">PAGO</Badge>
              ) : (
                <Badge color="warning">PENDENTE</Badge>
              ),
          }),
          TableList.Column<Revenue>({
            header: "Forma",
            accessorFn: (row) => paymentMethodLabel(row.paymentMethod),
          }),
          TableList.Column<Revenue>({
            header: "Pago em",
            accessorFn: (row) => (row.paidAt ? formatDateTime(row.paidAt) : "-"),
          }),
        ],
        renderActions: canManage
          ? (row) => (
              <DropdownComponent.Item
                label="Pagamento"
                icon={<i className="mdi mdi-pencil-outline me-1" />}
                onClick={() => setEditing(row)}
              />
            )
          : undefined,
      }),
    [canManage],
  )

  return (
    <>
      <BaseLayout.Root title="Receitas" pageTitle="Financeiro">
        <BaseLayout.Header isFilters={false} />
        <BaseLayout.Body>
          <>
            <Filters
              value={filters}
              onChange={setFilters}
              dateFieldLabels={["Data da consulta", "Data do pagamento"]}
              professionals={professionals}
            />
            <Totals
              items={[
                { label: "Total", value: totals?.total },
                { label: "Recebido", value: totals?.received, color: "success" },
                { label: "A receber", value: totals?.receivable, color: "warning" },
              ]}
            />
            {professional && (
              <Payout
                professionalName={professional.label}
                totals={totals}
                onCreateExpense={hasPermission("FINANCE_MANAGE") ? openPayoutExpense : undefined}
              />
            )}
            <div className="p-3">
              <TableList.Root columns={columns} data={revenues || []} />
            </div>
          </>
        </BaseLayout.Body>
      </BaseLayout.Root>

      {expense.modalOpen && (
        <FormModal
          size="lg"
          title="Cadastro de despesa"
          submitLabel="Salvar"
          isOpen={expense.modalOpen}
          toggle={expense.toggleModal}
          form={expense.form}
          onSubmit={expense.handleSubmit}
          isPending={mutationExpense.isPending}
        >
          <ExpenseForm />
        </FormModal>
      )}

      {editing && (
        <PaymentModal
          isOpen
          toggle={() => setEditing(null)}
          title="Pagamento da consulta"
          initial={{
            paid: editing.paid,
            paymentMethod: editing.paymentMethod,
          }}
          onSubmit={(payload) =>
            mutation.mutateAsync({
              appointmentId: editing.appointmentId,
              ...toPaymentPayload(payload),
            })
          }
          isPending={mutation.isPending}
        />
      )}
    </>
  )
}

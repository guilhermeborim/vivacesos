import {
  BaseLayout,
  ButtonPrimitive,
  DropdownComponent,
  FormModal,
  ModalComponent,
  TableList,
} from "@/core/ui"
import { useAuth, useFormModal } from "@/shared/hooks"
import { Expense } from "@/shared/types"
import { formatCurrency, formatDate, formatDateTime } from "@/shared/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"
import { Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Badge } from "reactstrap"
import {
  useMutationDeleteExpense,
  useMutationExpense,
  useMutationExpensePayment,
  useMutationUpdateExpense,
} from "../api/mutations"
import { useQueryExpenses } from "../api/queries"
import { ExpenseForm } from "../components/expense-form"
import { Filters } from "../components/filters"
import { PaymentModal } from "../components/payment-modal"
import { Totals } from "../components/totals"
import { expenseSchema, ExpenseTypeSchema, FinanceFilters } from "../schemas"
import { currentMonthFilters, paymentMethodLabel, toPaymentPayload } from "../utils"

export function ExpensesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission("FINANCE_MANAGE")
  const [filters, setFilters] = useState<FinanceFilters>(currentMonthFilters)
  const { totals, expenses } = useQueryExpenses(filters)

  const [editing, setEditing] = useState<Expense | null>(null)
  const [paying, setPaying] = useState<Expense | null>(null)
  const [removing, setRemoving] = useState<Expense | null>(null)

  const mutationCreate = useMutationExpense()
  const create = useFormModal<ExpenseTypeSchema>(expenseSchema, mutationCreate.mutateAsync)

  const mutationUpdate = useMutationUpdateExpense(editing?.expenseId ?? "")
  const editForm = useForm<ExpenseTypeSchema>({ resolver: zodResolver(expenseSchema) })
  const closeEdit = () => {
    setEditing(null)
    editForm.reset()
  }
  const submitEdit = editForm.handleSubmit(async (payload) => {
    try {
      await mutationUpdate.mutateAsync(payload)
      closeEdit()
    } catch {
      // Erro já tratado no onError da mutation
    }
  })

  const mutationPayment = useMutationExpensePayment(paying?.expenseId ?? "")
  const mutationDelete = useMutationDeleteExpense(removing?.expenseId ?? "")

  const columns = useMemo(
    () =>
      TableList.Columns<Expense>({
        columns: [
          TableList.Column<Expense>({
            header: "Descrição",
            accessorFn: (row) => row.description,
          }),
          TableList.Column<Expense>({
            header: "Categoria",
            accessorFn: (row) => row.category ?? "-",
          }),
          TableList.Column<Expense>({
            header: "Vencimento",
            accessorFn: (row) => formatDate(row.dueDate),
          }),
          TableList.Column<Expense>({
            header: "Valor",
            accessorFn: (row) => formatCurrency(row.amount),
          }),
          TableList.Column<Expense>({
            header: "Pagamento",
            accessorFn: (row) => (row.paid ? "Pago" : "Pendente"),
            cell: (row) =>
              row.paid ? (
                <Badge color="success">PAGO</Badge>
              ) : (
                <Badge color="warning">PENDENTE</Badge>
              ),
          }),
          TableList.Column<Expense>({
            header: "Forma",
            accessorFn: (row) => paymentMethodLabel(row.paymentMethod),
          }),
          TableList.Column<Expense>({
            header: "Pago em",
            accessorFn: (row) => (row.paidAt ? formatDateTime(row.paidAt) : "-"),
          }),
        ],
        renderActions: canManage
          ? (row) => (
              <>
                <DropdownComponent.Item
                  label="Editar"
                  icon={<i className="mdi mdi-pencil-outline me-1" />}
                  onClick={() => setEditing(row)}
                />
                <DropdownComponent.Item
                  label="Pagamento"
                  icon={<i className="mdi mdi-eye-outline me-1" />}
                  onClick={() => setPaying(row)}
                />
                <DropdownComponent.Item
                  label="Remover"
                  variant="danger"
                  icon={<i className="mdi mdi-eye-off-outline me-1" />}
                  onClick={() => setRemoving(row)}
                />
              </>
            )
          : undefined,
      }),
    [canManage],
  )

  if (!hasPermission("FINANCE_VIEW")) return <Navigate to="/error-403" />

  return (
    <>
      <BaseLayout.Root title="Despesas" pageTitle="Financeiro">
        <BaseLayout.Header isFilters={false}>
          {canManage && (
            <ButtonPrimitive variant="primary" onClick={create.toggleModal}>
              Cadastrar
            </ButtonPrimitive>
          )}
        </BaseLayout.Header>
        <BaseLayout.Body>
          <>
            <Filters
              value={filters}
              onChange={setFilters}
              dateFieldLabels={["Vencimento", "Data do pagamento"]}
            />
            <Totals
              items={[
                { label: "Pago", value: totals?.paid, color: "success" },
                { label: "Pendente", value: totals?.pending, color: "warning" },
              ]}
            />
            <div className="p-3">
              <TableList.Root columns={columns} data={expenses || []} />
            </div>
          </>
        </BaseLayout.Body>
      </BaseLayout.Root>

      {create.modalOpen && (
        <FormModal
          size="lg"
          title="Cadastro de despesa"
          submitLabel="Salvar"
          isOpen={create.modalOpen}
          toggle={create.toggleModal}
          form={create.form}
          onSubmit={create.handleSubmit}
          isPending={mutationCreate.isPending}
        >
          <ExpenseForm />
        </FormModal>
      )}

      {editing && (
        <FormModal
          mode="edit"
          size="lg"
          title="Atualize os dados da despesa"
          submitLabel="Atualizar"
          isOpen
          toggle={closeEdit}
          form={editForm}
          onSubmit={submitEdit}
          isPending={mutationUpdate.isPending}
        >
          <ExpenseForm defaultValues={editing} />
        </FormModal>
      )}

      {paying && (
        <PaymentModal
          isOpen
          toggle={() => setPaying(null)}
          title="Pagamento da despesa"
          initial={{ paid: paying.paid, paymentMethod: paying.paymentMethod }}
          onSubmit={(payload) => mutationPayment.mutateAsync(toPaymentPayload(payload))}
          isPending={mutationPayment.isPending}
        />
      )}

      {removing && (
        <RemoveExpenseModal
          expense={removing}
          isPending={mutationDelete.isPending}
          toggle={() => setRemoving(null)}
          onConfirm={async () => {
            try {
              await mutationDelete.mutateAsync()
              setRemoving(null)
            } catch {
              // Erro já tratado no onError da mutation
            }
          }}
        />
      )}
    </>
  )
}

interface RemoveExpenseModalProps {
  expense: Expense
  isPending: boolean
  toggle: () => void
  onConfirm: () => void
}

function RemoveExpenseModal({ expense, isPending, toggle, onConfirm }: RemoveExpenseModalProps) {
  return (
    <ModalComponent.Root isOpen toggle={toggle}>
      <ModalComponent.Body>
        <h5>Tem certeza que deseja remover esta despesa?</h5>
        <p>
          Você está prestes a <strong>REMOVER</strong> a despesa{" "}
          <strong>{expense.description}</strong> ({formatCurrency(expense.amount)}). Essa
          ação não pode ser desfeita.
        </p>
      </ModalComponent.Body>
      <ModalComponent.Footer>
        <ButtonPrimitive variant="danger" onClick={onConfirm} isLoading={isPending}>
          Remover
        </ButtonPrimitive>
      </ModalComponent.Footer>
    </ModalComponent.Root>
  )
}

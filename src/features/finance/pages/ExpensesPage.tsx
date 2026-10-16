import {
  BaseLayout,
  ButtonPrimitive,
  DropdownComponent,
  FormModal,
  InfoRules,
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
  useMutationDeletePayout,
  useMutationStopRecurrence,
  useMutationExpense,
  useMutationExpensePayment,
  useMutationUpdateExpense,
} from "../api/mutations"
import { useQueryExpenses } from "../api/queries"
import { ExpenseForm } from "../components/expense-form"
import { UndoPayoutModal } from "../components/payout"
import { Filters } from "../components/filters"
import { PaymentModal } from "../components/payment-modal"
import { Totals } from "../components/totals"
import { expenseSchema, ExpenseTypeSchema, FinanceFilters } from "../schemas"
import { currentMonthFilters, paymentMethodLabel, toPaymentPayload } from "../utils"

const recurrenceLabel = {
  NONE: "",
  DAILY: "Diária",
  WEEKLY: "Semanal",
  BIWEEKLY: "Quinzenal",
  MONTHLY: "Mensal",
} as const

export function ExpensesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission("FINANCE_MANAGE")
  const [filters, setFilters] = useState<FinanceFilters>(currentMonthFilters)
  const { totals, expenses } = useQueryExpenses(filters)

  const [editing, setEditing] = useState<Expense | null>(null)
  const [paying, setPaying] = useState<Expense | null>(null)
  const [removing, setRemoving] = useState<Expense | null>(null)
  const [undoing, setUndoing] = useState<Expense | null>(null)
  const mutationUndo = useMutationDeletePayout()
  const mutationStop = useMutationStopRecurrence()

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
            header: "Recorrência",
            accessorFn: (row) =>
              row.recurrence !== "NONE"
                ? `${recurrenceLabel[row.recurrence]} · próxima ${row.recurrenceNextDate ? formatDate(row.recurrenceNextDate) : "-"}`
                : row.isRecurrenceOccurrence
                  ? "Recorrente (automática)"
                  : "-",
            cell: (row) =>
              row.recurrence !== "NONE" ? (
                <Badge color="info">
                  {recurrenceLabel[row.recurrence]} · próxima{" "}
                  {row.recurrenceNextDate ? formatDate(row.recurrenceNextDate) : "-"}
                </Badge>
              ) : row.isRecurrenceOccurrence ? (
                <Badge color="secondary">RECORRENTE · AUTOMÁTICA</Badge>
              ) : (
                "-"
              ),
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
          ? (row) =>
            row.payoutId ? (
              // Repasse a profissional: valor e remoção são controlados pelo lançamento do repasse.
              <>
                <DropdownComponent.Item
                  label="Pagamento"
                  icon={<i className="mdi mdi-eye-outline me-1" />}
                  onClick={() => setPaying(row)}
                />
                {!row.paid && (
                  <DropdownComponent.Item
                    label="Desfazer repasse"
                    variant="danger"
                    icon={<i className="mdi mdi-eye-off-outline me-1" />}
                    onClick={() => setUndoing(row)}
                  />
                )}
              </>
            ) : (
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
                {(row.recurrence !== "NONE" || row.isRecurrenceOccurrence) && (
                  <DropdownComponent.Item
                    label="Encerrar recorrência"
                    icon={<i className="mdi mdi-eye-off-outline me-1" />}
                    onClick={() => mutationStop.mutate(row.expenseId)}
                  />
                )}
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
            <InfoRules
              rules={[
                "Cadastrar uma despesa não a marca como paga: registre o pagamento na ação “Pagamento”.",
                "Por padrão mostra o mês atual. Você pode filtrar pelo vencimento ou pela data do pagamento.",
                "Despesas recorrentes (se o ADMIN ligar a opção em Configurações) criam sozinhas uma nova despesa pendente no dia de cada vencimento; a etiqueta mostra a periodicidade e a próxima data, e “Encerrar recorrência” interrompe a série.",
                "Remover uma despesa é definitivo. Despesas de repasse (categoria Repasse) não são removidas nem editadas aqui: para corrigir, use “Desfazer repasse” (enquanto não estiver paga) e lance de novo em Receitas.",
                "Somente quem tem acesso ao financeiro (ADMIN e recepcionista) vê esta tela.",
              ]}
            />
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

      {undoing?.payoutId && (
        <UndoPayoutModal
          payout={undoing}
          isPending={mutationUndo.isPending}
          toggle={() => setUndoing(null)}
          onConfirm={async () => {
            try {
              await mutationUndo.mutateAsync(undoing.payoutId!)
              setUndoing(null)
            } catch {
              // Erro já tratado no onError da mutation
            }
          }}
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

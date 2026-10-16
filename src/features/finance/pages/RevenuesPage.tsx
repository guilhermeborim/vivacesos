import { BaseLayout, DropdownComponent, InfoRules, TableList } from "@/core/ui"
import { useMutationAppointmentPayment } from "@/features/appointment/api/mutations"
import { useQueryProfessionals } from "@/features/professional/api/queries"
import { useAuth } from "@/shared/hooks"
import { Revenue } from "@/shared/types"
import { formatCurrency, formatDateTime } from "@/shared/utils"
import { useMemo, useState } from "react"
import { Badge } from "reactstrap"
import { useQueryRevenues } from "../api/queries"
import { Filters } from "../components/filters"
import { Payout } from "../components/payout"
import { PaymentModal } from "../components/payment-modal"
import { Totals } from "../components/totals"
import { useProfessionalFilter } from "../hooks"
import { FinanceFilters } from "../schemas"
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

  const { dataProfessionals } = useQueryProfessionals()
  const defaultPercent = dataProfessionals?.find(
    (p) => p.professional.professionalId === filters.professionalId,
  )?.professional.payoutPercent

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
          TableList.Column<Revenue>({
            header: "Repasse",
            accessorFn: (row) => (row.payoutId ? "Repassada" : "-"),
            cell: (row) => (row.payoutId ? <Badge color="info">REPASSADA</Badge> : "-"),
          }),
        ],
        // Consulta repassada não muda de pagamento (desfaça o repasse antes).
        renderActions: canManage
          ? (row) =>
              row.payoutId ? null : (
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
            <InfoRules
              rules={[
                "As receitas vêm das consultas. O valor da consulta não significa que foi pago: marque o pagamento na ação “Pagamento”.",
                "Por padrão mostra o mês atual. Você pode filtrar pela data da consulta ou pela data do pagamento.",
                "Total soma as consultas agendadas, confirmadas e concluídas; Recebido é o que já foi pago; A receber é o que falta pagar.",
                "Com um profissional filtrado, o bloco Repasse mostra quanto repassar: o percentual sobre as consultas pagas que ainda não foram repassadas, de qualquer período. “Lançar repasse” cria a despesa em Despesas.",
                "Consulta repassada fica marcada e não muda de valor nem de pagamento. Para alterá-la, desfaça o repasse (enquanto a despesa não estiver paga).",
                "O profissional vê apenas as próprias consultas.",
              ]}
            />
            <Filters
              value={filters}
              onChange={setFilters}
              dateFieldLabels={["Data da consulta", "Data do pagamento"]}
              professionals={professionals}
            />
            <Totals
              items={[
                { label: "Total", value: totals?.total },
                {
                  label: "Recebido",
                  value: totals?.received,
                  color: "success",
                },
                {
                  label: "A receber",
                  value: totals?.receivable,
                  color: "warning",
                },
              ]}
            />
            {professional && filters.professionalId && (
              <Payout
                professionalId={filters.professionalId}
                professionalName={professional.label}
                defaultPercent={defaultPercent}
                canManage={canManage}
              />
            )}
            <div className="p-3">
              <TableList.Root columns={columns} data={revenues || []} />
            </div>
          </>
        </BaseLayout.Body>
      </BaseLayout.Root>

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

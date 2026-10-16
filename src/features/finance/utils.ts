import { PaymentMethod } from "@/shared/enums"
import { FinanceFilters, PaymentTypeSchema } from "./schemas"

export const paymentMethodOptions = [
  { label: "Pix", value: PaymentMethod.PIX },
  { label: "Cartão", value: PaymentMethod.CARTAO },
  { label: "Dinheiro", value: PaymentMethod.DINHEIRO },
]

export const paymentMethodLabel = (method: PaymentMethod | null) =>
  paymentMethodOptions.find((o) => o.value === method)?.label ?? "-"

const pad = (n: number) => String(n).padStart(2, "0")
const toDateInput = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

/** Filtro padrão: mês atual. */
export const currentMonthFilters = (): FinanceFilters => {
  const now = new Date()
  return {
    from: toDateInput(new Date(now.getFullYear(), now.getMonth(), 1)),
    to: toDateInput(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
    paid: "",
    dateField: "startsAt",
    professionalId: "",
  }
}

/**
 * AAAA-MM-DD -> data/hora ISO com o offset local (ex.: 2026-01-31T23:59:59-03:00).
 * Mantém o dia correto quando a API usa os 10 primeiros caracteres como data.
 */
const boundary = (date: string, time: string) => {
  const offset = -new Date(`${date}T${time}`).getTimezoneOffset()
  const sign = offset >= 0 ? "+" : "-"
  const abs = Math.abs(offset)
  return `${date}T${time}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
}

export const periodParams = (f: FinanceFilters) => ({
  from: f.from ? boundary(f.from, "00:00:00") : undefined,
  to: f.to ? boundary(f.to, "23:59:59") : undefined,
  dateField: f.dateField,
  professionalId: f.professionalId || undefined,
})

export const toPaymentPayload = (p: PaymentTypeSchema) => ({
  paid: p.paid,
  paymentMethod: p.paid ? (p.paymentMethod ?? undefined) : undefined,
})

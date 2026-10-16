import { formatCurrency } from "@/shared/utils"

/** 0 / 1K / 2,5K / 1M: eixos compactos a partir de mil. */
export function formatCompact(value: number) {
  const abs = Math.abs(value)
  if (abs >= 1_000_000)
    return `${(value / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}M`
  if (abs >= 1_000)
    return `${(value / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}K`
  return String(value)
}

export const currency = formatCurrency

/** "2026-05" -> "mai". */
export function monthShort(key: string) {
  const [year, month] = key.split("-").map(Number)
  return new Date(year, month - 1, 1)
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "")
}

/** "2026-05" -> "maio de 2026". */
export function monthLong(key: string) {
  const [year, month] = key.split("-").map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  })
}

export const paymentMethodName: Record<string, string> = {
  PIX: "Pix",
  CARTAO: "Cartão",
  DINHEIRO: "Dinheiro",
}

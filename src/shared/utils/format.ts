export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })

export const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR")

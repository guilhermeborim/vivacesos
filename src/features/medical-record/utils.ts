/** Início e fim do dia local, em ISO com offset (a API não conhece o fuso do navegador). */
export function todayRange() {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  return { from: toIsoWithOffset(start), to: toIsoWithOffset(end) }
}

function toIsoWithOffset(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0")
  const offset = -d.getTimezoneOffset()
  const sign = offset >= 0 ? "+" : "-"
  const abs = Math.abs(offset)
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
    `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
  )
}

/** Substitui as variáveis de um modelo de ficha. */
export function applyTemplate(
  content: string,
  vars: { paciente: string; profissional?: string | null },
) {
  return content
    .replace(/\{\{\s*paciente\s*\}\}/gi, vars.paciente)
    .replace(/\{\{\s*profissional\s*\}\}/gi, vars.profissional ?? "")
    .replace(/\{\{\s*data\s*\}\}/gi, new Date().toLocaleDateString("pt-BR"))
}

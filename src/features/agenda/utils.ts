const pad = (n: number) => String(n).padStart(2, "0")

/** Data local no formato AAAA-MM-DD. */
export const toDateKey = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

/** AAAA-MM-DD -> Date à meia-noite local. */
export const fromDateKey = (key: string) => {
  const [y, m, d] = key.split("-").map(Number)
  return new Date(y, m - 1, d)
}

/** Minutos desde 00:00 local de um instante ISO. */
export const minutesOfDay = (iso: string) => {
  const d = new Date(iso)
  return d.getHours() * 60 + d.getMinutes()
}

export const minutesLabel = (minutes: number) =>
  `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`

/** Instante ISO de "data local + minutos do dia". */
export const toSlotIso = (dateKey: string, minutes: number) =>
  new Date(fromDateKey(dateKey).getTime() + minutes * 60_000).toISOString()

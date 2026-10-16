const pad = (n: number) => String(n).padStart(2, "0")

/** ISO (UTC) -> valor de <input type="datetime-local"> no fuso local. */
export const toLocalInput = (iso: string) => {
  const d = new Date(iso)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** Valor de <input type="datetime-local"> -> ISO com offset exigido pela API. */
export const toIso = (local: string) => new Date(local).toISOString()

/** Soma 1 hora a um valor de <input type="datetime-local">. */
export const addOneHour = (local: string) =>
  toLocalInput(new Date(new Date(local).getTime() + 60 * 60 * 1000).toISOString())

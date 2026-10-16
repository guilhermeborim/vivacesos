import { useSyncExternalStore } from "react"

/** Menor intervalo permitido: 30 s (0 = desligado). */
export const INTERVAL_OPTIONS = [
  { label: "30 segundos", value: 30_000 },
  { label: "1 minuto", value: 60_000 },
  { label: "5 minutos", value: 300_000 },
  { label: "Desligado", value: 0 },
]

const STORAGE_KEY = "notifications:interval"
const DEFAULT_INTERVAL = 30_000

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const stored = Number(raw)
    // Valor antigo/inválido (ex.: 15 s, que não existe mais) volta ao padrão.
    return raw !== null && INTERVAL_OPTIONS.some((o) => o.value === stored)
      ? stored
      : DEFAULT_INTERVAL
  } catch {
    return DEFAULT_INTERVAL
  }
}

// Loja simples: o sino e a tela de Configurações enxergam o mesmo valor sem recarregar.
let current = read()
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const setStored = (value: number) => {
  current = value
  try {
    localStorage.setItem(STORAGE_KEY, String(value))
  } catch {
    // Sem localStorage: a preferência vale só nesta sessão.
  }
  listeners.forEach((listener) => listener())
}

/** Intervalo de atualização do sino; preferência só deste navegador (0 = desligado). */
export function useNotificationInterval() {
  const interval = useSyncExternalStore(subscribe, () => current)
  return { interval, setInterval: setStored, intervalMs: interval > 0 ? interval : null }
}

/** "agora", "há 5 min", "há 3 h", "há 2 d". */
export function timeAgo(iso: string) {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000)
  if (minutes < 1) return "agora"
  if (minutes < 60) return `há ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours} h`
  return `há ${Math.floor(hours / 24)} d`
}

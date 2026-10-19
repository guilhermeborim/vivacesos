import { DASHBOARD_PATH } from "@/core/layouts/menu-visibility"
import { useAuth } from "@/shared/hooks"
import { useSyncExternalStore } from "react"

const keyOf = (userId: string) => `home-page:${userId}`

/** Tela inicial salva neste navegador para o usuário (vazio = Dashboard). */
export function readHomePage(userId: string | undefined) {
  if (!userId) return DASHBOARD_PATH
  try {
    return localStorage.getItem(keyOf(userId)) || DASHBOARD_PATH
  } catch {
    return DASHBOARD_PATH
  }
}

// Loja simples: o modal e as rotas enxergam o mesmo valor sem recarregar.
const listeners = new Set<() => void>()
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function writeHomePage(userId: string, path: string) {
  try {
    if (path === DASHBOARD_PATH) localStorage.removeItem(keyOf(userId))
    else localStorage.setItem(keyOf(userId), path)
  } catch {
    // Sem localStorage: a preferência não é guardada.
  }
  listeners.forEach((listener) => listener())
}

/** Tela que abre ao entrar no sistema; preferência só deste navegador, por usuário. */
export function useHomePage() {
  const { session } = useAuth()
  const userId = session?.user.id
  const homePage = useSyncExternalStore(subscribe, () => readHomePage(userId))
  return {
    homePage,
    setHomePage: (path: string) => userId && writeHomePage(userId, path),
  }
}

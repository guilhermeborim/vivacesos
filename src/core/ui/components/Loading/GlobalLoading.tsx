import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Loading } from "./Loading"

/** Buscas em segundo plano (atualização automática, pintura do calendário) não travam a tela. */
const BACKGROUND_KEYS = ["notifications", "agenda-days"]

/** Só some/aparece depois de um instante: carregamentos rápidos não piscam a tela escura. */
const DELAY_MS = 150

/**
 * Overlay único para a aplicação inteira: aparece na primeira carga de qualquer tela (consulta
 * sem dados ainda) e enquanto uma ação (mutation) está em andamento, como mudar o status.
 */
export function GlobalLoading() {
  const fetching = useIsFetching({
    predicate: (query) =>
      query.state.data === undefined &&
      !query.queryKey.some((part) => BACKGROUND_KEYS.includes(String(part))),
  })
  const mutating = useIsMutating()
  const busy = fetching + mutating > 0

  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(busy), busy ? DELAY_MS : 0)
    return () => clearTimeout(timer)
  }, [busy])

  return <Loading loading={visible} />
}

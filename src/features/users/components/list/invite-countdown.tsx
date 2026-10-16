import { useEffect, useState } from "react"
import { Badge } from "reactstrap"

const MINUTE = 60_000

/** Ex.: "23h 59min", "45min", "menos de 1min". */
function formatRemaining(ms: number) {
  const totalMinutes = Math.floor(ms / MINUTE)
  if (totalMinutes < 1) return "menos de 1min"
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return hours > 0 ? `${hours}h ${String(minutes).padStart(2, "0")}min` : `${minutes}min`
}

/** Tempo restante para o convite ser aceito; atualiza sozinho a cada 15 segundos. */
export function InviteCountdown({ expiresAt }: { expiresAt: string }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 15_000)
    return () => clearInterval(timer)
  }, [])

  const remaining = new Date(expiresAt).getTime() - now
  if (remaining <= 0) return <Badge color="danger">Expirado</Badge>

  return (
    <Badge color={remaining < 60 * MINUTE ? "warning" : "info"}>
      Expira em {formatRemaining(remaining)}
    </Badge>
  )
}

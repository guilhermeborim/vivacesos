import { INTERVAL_OPTIONS, useNotificationInterval } from "@/features/notifications/hooks"
import { Card, CardBody, Input, Label } from "reactstrap"

/** Preferência de cada pessoa neste navegador (não depende de permissão). */
export function NotificationsSection() {
  const { interval, setInterval } = useNotificationInterval()

  return (
    <Card className="border">
      <CardBody>
        <h6 className="mb-1">Notificações</h6>
        <p className="text-muted">
          Com que frequência o sino procura avisos novos. O mínimo é 30 segundos. A preferência vale
          só para este navegador.
        </p>
        <Label className="form-label" htmlFor="notification-interval">
          Atualizar automaticamente
        </Label>
        <Input
          id="notification-interval"
          type="select"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          style={{ maxWidth: 260 }}
        >
          {INTERVAL_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Input>
      </CardBody>
    </Card>
  )
}

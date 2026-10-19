import { ButtonPrimitive } from "@/core/ui"
import { fromDateKey, toDateKey } from "../utils"

interface MonthCalendarProps {
  /** Dia selecionado (AAAA-MM-DD). */
  selected: string
  /** Mês exibido (AAAA-MM). */
  month: string
  onMonthChange: (month: string) => void
  onSelect: (date: string) => void
  /** Volta para o dia (e o mês) de hoje. */
  onToday: () => void
  /** Dias do mês com horário livre (verde); os demais ficam cinza. */
  days: { date: string; available: boolean }[]
}

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"]

const shiftMonth = (month: string, delta: number) => {
  const [y, m] = month.split("-").map(Number)
  const d = new Date(y, m - 1 + delta, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

export function MonthCalendar({
  selected,
  month,
  onMonthChange,
  onSelect,
  onToday,
  days,
}: MonthCalendarProps) {
  const first = fromDateKey(`${month}-01`)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const today = toDateKey(new Date())
  const availability = new Map(days.map((d) => [d.date, d.available]))
  const title = first.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })

  const cells: (string | null)[] = [
    ...Array<null>(first.getDay()).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`),
  ]

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
        <strong className="text-capitalize">{title}</strong>
        <div className="d-flex gap-1">
          <ButtonPrimitive
            size="sm"
            variant="light"
            aria-label="Mês anterior"
            onClick={() => onMonthChange(shiftMonth(month, -1))}
          >
            <i className="ri-arrow-left-s-line" />
          </ButtonPrimitive>
          <ButtonPrimitive
            size="sm"
            variant="primary"
            disabled={selected === today && month === today.slice(0, 7)}
            onClick={onToday}
          >
            Hoje
          </ButtonPrimitive>
          <ButtonPrimitive
            size="sm"
            variant="light"
            aria-label="Próximo mês"
            onClick={() => onMonthChange(shiftMonth(month, 1))}
          >
            <i className="ri-arrow-right-s-line" />
          </ButtonPrimitive>
        </div>
      </div>
      <div className="d-grid text-center gap-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
        {WEEKDAYS.map((w, i) => (
          <small key={i} className="text-muted">
            {w}
          </small>
        ))}
        {cells.map((date, i) =>
          date ? (
            <button
              type="button"
              key={date}
              onClick={() => onSelect(date)}
              aria-pressed={date === selected}
              title={availability.get(date) ? "Há horários livres" : "Sem horários livres"}
              className={`agenda-cal-day ${availability.get(date) ? "free" : "none"} ${
                date === today ? "today" : ""
              } ${date === selected ? "selected" : ""}`}
            >
              {Number(date.slice(8))}
            </button>
          ) : (
            <span key={`empty-${i}`} />
          ),
        )}
      </div>
      <div className="d-flex gap-3 mt-3 small text-muted">
        <span>
          <i className="ri-checkbox-blank-circle-fill text-success me-1" />
          Com horário livre
        </span>
        <span>
          <i className="ri-checkbox-blank-circle-fill me-1" />
          Sem horário
        </span>
      </div>
    </div>
  )
}

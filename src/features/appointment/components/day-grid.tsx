import { AppointmentActions } from "../hooks/use-appointment-actions"
import { Appointment, AppointmentAgenda } from "@/shared/types"
import { fromDateKey, minutesLabel, minutesOfDay } from "../utils"
import { AppointmentCard } from "./appointment-card"

type AgendaAppointment = Appointment["appointment"]

interface DayGridProps {
  date: string
  agenda: AppointmentAgenda
  actions: AppointmentActions
  onBook: (minutes: number) => void
  /** Abre a triagem da consulta (some se o usuário não tem permissão). */
  onTriage?: (appointment: AgendaAppointment) => void
}

type Row =
  | { kind: "booked"; start: number; end: number; appointment: AgendaAppointment }
  | { kind: "free"; start: number; end: number }
  | { kind: "past"; start: number; end: number }
  | { kind: "closed"; start: number; end: number }

const WINDOW_START = 7 * 60
const WINDOW_END = 19 * 60

/**
 * Linhas do dia: horários da grade (livres ou passados), consultas (no próprio horário) e, nas
 * horas sem atendimento dentro da janela do dia, uma linha cinza de "Horário fechado".
 */
function buildRows(date: string, agenda: AppointmentAgenda): Row[] {
  const base = fromDateKey(date).getTime()
  const now = Date.now()
  const booked = agenda.appointments
    .map((appointment) => ({
      appointment,
      start: minutesOfDay(appointment.startsAt),
      end: minutesOfDay(appointment.endsAt) || 1440,
    }))
    .sort((a, b) => a.start - b.start)

  const rows: Row[] = booked.map((b) => ({ kind: "booked", ...b }))
  for (const slot of agenda.slots) {
    const start = minutesOfDay(slot.startsAt)
    const end = minutesOfDay(slot.endsAt) || 1440
    if (booked.some((b) => b.start < end && b.end > start)) continue
    rows.push({
      kind: new Date(base + start * 60_000).getTime() <= now ? "past" : "free",
      start,
      end,
    })
  }

  // Horas sem atendimento: linha cinza de hora em hora, dentro da janela do dia.
  const starts = rows.map((r) => r.start)
  const ends = rows.map((r) => r.end)
  const from = Math.min(WINDOW_START, Math.floor(Math.min(...starts, WINDOW_START) / 60) * 60)
  const to = Math.max(WINDOW_END, Math.ceil(Math.max(...ends, WINDOW_END) / 60) * 60)
  for (let h = from; h < to; h += 60) {
    if (!rows.some((r) => r.start < h + 60 && r.end > h)) {
      rows.push({ kind: "closed", start: h, end: h + 60 })
    }
  }
  return rows.sort((a, b) => a.start - b.start)
}

export function DayGrid({ date, agenda, actions, onBook, onTriage }: DayGridProps) {
  const rows = buildRows(date, agenda)
  const hasOpen = agenda.slots.length > 0 || agenda.appointments.length > 0

  return (
    <>
      {!hasOpen && (
        <p className="text-muted">
          O profissional não atende neste dia. Altere em Minha agenda (ou em Profissionais da Saúde
          → Horários de atendimento).
        </p>
      )}
      <div className="border-top">
        {rows.map((row) => (
          <div className="agenda-row" key={`${row.kind}-${row.start}`}>
            <div className="agenda-time">{minutesLabel(row.start)}</div>
            {row.kind === "booked" && (
              <AppointmentCard
                appointment={row.appointment}
                start={row.start}
                end={row.end}
                actions={actions}
                onTriage={onTriage}
              />
            )}
            {row.kind === "free" && (
              <button type="button" className="agenda-free" onClick={() => onBook(row.start)}>
                <i className="ri-add-line me-1" />
                Agendar
              </button>
            )}
            {row.kind === "past" && <div className="agenda-closed past">Horário encerrado</div>}
            {row.kind === "closed" && <div className="agenda-closed">Horário fechado</div>}
          </div>
        ))}
      </div>
    </>
  )
}

import { ButtonPrimitive, InfoRules } from "@/core/ui"
import { useEffect, useState } from "react"
import { Card, CardBody, Input, Label } from "reactstrap"
import { useMutationAvailability } from "../../api/mutations"
import { useQueryAvailability } from "../../api/queries"

const WEEKDAYS = [
  { weekday: 1, label: "Segunda" },
  { weekday: 2, label: "Terça" },
  { weekday: 3, label: "Quarta" },
  { weekday: 4, label: "Quinta" },
  { weekday: 5, label: "Sexta" },
  { weekday: 6, label: "Sábado" },
  { weekday: 0, label: "Domingo" },
]

const PERIODS = [
  { label: "Manhã", hours: [6, 7, 8, 9, 10, 11] },
  { label: "Tarde", hours: [12, 13, 14, 15, 16, 17] },
  { label: "Noite", hours: [18, 19, 20, 21, 22, 23] },
]

type Selection = Record<number, number[]>

const hourLabel = (h: number) => `${String(h).padStart(2, "0")}:00`

interface AvailabilityEditorProps {
  professionalId: string
  /** Chamado depois de salvar (ex.: fechar o modal). */
  onSaved?: () => void
}

/** Grade de horários de atendimento: dias da semana × horas de 1 h (manhã, tarde, noite). */
export function AvailabilityEditor({ professionalId, onSaved }: AvailabilityEditorProps) {
  const { availability, loadingAvailability } = useQueryAvailability(professionalId)
  const mutation = useMutationAvailability(professionalId)
  const [restricted, setRestricted] = useState(false)
  const [selection, setSelection] = useState<Selection>({})

  useEffect(() => {
    if (!availability) return
    setRestricted(availability.restricted)
    setSelection(Object.fromEntries(availability.days.map((d) => [d.weekday, d.hours])))
  }, [availability])

  const toggle = (weekday: number, hour: number) =>
    setSelection((prev) => {
      const current = prev[weekday] ?? []
      return {
        ...prev,
        [weekday]: current.includes(hour) ? current.filter((h) => h !== hour) : [...current, hour],
      }
    })

  const copyToAll = (weekday: number) =>
    setSelection((prev) =>
      Object.fromEntries(WEEKDAYS.map((d) => [d.weekday, [...(prev[weekday] ?? [])]])),
    )

  const clearDay = (weekday: number) => setSelection((prev) => ({ ...prev, [weekday]: [] }))

  const save = async () => {
    try {
      await mutation.mutateAsync({
        restricted,
        days: Object.entries(selection)
          .filter(([, hours]) => hours.length > 0)
          .map(([weekday, hours]) => ({ weekday: Number(weekday), hours })),
      })
      onSaved?.()
    } catch {
      // Erro já tratado no onError da mutation
    }
  }

  const noneSelected = Object.values(selection).every((h) => h.length === 0)

  return (
    <>
      <InfoRules
        rules={[
          "Marque as horas em que você atende nesta clínica. Cada hora marcada é dividida em consultas do tempo definido em “Tempo de consulta” (ex.: 08:00 com 30 min = 08:00 e 08:30).",
          "O que não estiver marcado é tratado como horário em que você não atende: o cadastro de consulta só oferece as horas marcadas.",
          "Com “Atendo em qualquer horário” ligado, nenhuma restrição é aplicada.",
          "Consultas que já estão marcadas fora do novo horário não são alteradas.",
          "Use “Copiar para todos os dias” para repetir o horário de um dia nos demais.",
        ]}
      />
      <Card className="border mb-3">
        <CardBody className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <h6 className="mb-1">Atendo em qualquer horário</h6>
            <p className="text-muted mb-0">
              {restricted
                ? "Desligado: só as horas marcadas abaixo aceitam consultas."
                : "Ligado: a recepção pode marcar consultas em qualquer horário."}
            </p>
          </div>
          <div className="form-check form-switch form-switch-lg">
            <Input
              id="any-time-switch"
              type="switch"
              role="switch"
              checked={!restricted}
              onChange={(e) => setRestricted(!e.target.checked)}
            />
            <Label className="visually-hidden" htmlFor="any-time-switch">
              Atendo em qualquer horário
            </Label>
          </div>
        </CardBody>
      </Card>

      {restricted && (
        <>
          {WEEKDAYS.map(({ weekday, label }) => (
            <Card className="border mb-2" key={weekday}>
              <CardBody className="py-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">{label}</h6>
                  <div className="d-flex gap-1">
                    <ButtonPrimitive size="sm" variant="light" onClick={() => copyToAll(weekday)}>
                      Copiar para todos os dias
                    </ButtonPrimitive>
                    <ButtonPrimitive size="sm" variant="light" onClick={() => clearDay(weekday)}>
                      Limpar
                    </ButtonPrimitive>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-4">
                  {PERIODS.map((period) => (
                    <div key={period.label}>
                      <small className="text-muted d-block mb-1">{period.label}</small>
                      <div className="d-flex flex-wrap gap-1">
                        {period.hours.map((hour) => {
                          const active = (selection[weekday] ?? []).includes(hour)
                          return (
                            <button
                              type="button"
                              key={hour}
                              aria-pressed={active}
                              onClick={() => toggle(weekday, hour)}
                              className={`btn btn-sm ${active ? "btn-primary" : "btn-outline-secondary"}`}
                            >
                              {hourLabel(hour)}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
          {noneSelected && (
            <p className="text-danger">
              Nenhum horário marcado: ninguém conseguirá agendar consultas com você.
            </p>
          )}
        </>
      )}

      <div className="d-flex justify-content-end mt-3">
        <ButtonPrimitive variant="primary" isLoading={mutation.isPending} onClick={save}>
          Salvar horários
        </ButtonPrimitive>
      </div>
    </>
  )
}

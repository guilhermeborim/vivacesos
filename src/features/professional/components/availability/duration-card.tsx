import { ButtonPrimitive } from "@/core/ui"
import { useEffect, useState } from "react"
import { Card, CardBody, Input } from "reactstrap"
import { useMutationUpdateProfessional } from "../../api/mutations"
import { useQueryProfessionals } from "../../api/queries"

const OPTIONS = [10, 15, 20, 30, 40, 45, 50, 60, 90, 120]

/** Tempo de cada consulta: define o tamanho dos horários na agenda e o fim sugerido ao agendar. */
export function DurationCard({ professionalId }: { professionalId: string }) {
  const { dataProfessionals } = useQueryProfessionals()
  const mutation = useMutationUpdateProfessional(professionalId)
  const current = dataProfessionals?.find((p) => p.professional.professionalId === professionalId)
    ?.professional.appointmentDurationMinutes
  const [minutes, setMinutes] = useState(60)

  useEffect(() => {
    if (current) setMinutes(current)
  }, [current])

  const options = OPTIONS.includes(minutes) ? OPTIONS : [...OPTIONS, minutes].sort((a, b) => a - b)

  const save = async () => {
    try {
      await mutation.mutateAsync({ appointmentDurationMinutes: minutes })
    } catch {
      // Erro já tratado no onError da mutation
    }
  }

  return (
    <Card className="border mb-3">
      <CardBody className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
        <div>
          <h6 className="mb-1">Tempo de consulta</h6>
          <p className="text-muted mb-0">
            Cada horário da agenda tem este tamanho. Consultas já marcadas não mudam.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Input
            type="select"
            aria-label="Tempo de consulta"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            style={{ width: "auto" }}
          >
            {options.map((m) => (
              <option key={m} value={m}>
                {m} min
              </option>
            ))}
          </Input>
          <ButtonPrimitive
            variant="primary"
            isLoading={mutation.isPending}
            disabled={minutes === current}
            onClick={save}
          >
            Salvar
          </ButtonPrimitive>
        </div>
      </CardBody>
    </Card>
  )
}

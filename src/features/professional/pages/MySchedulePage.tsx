import { BaseLayout } from "@/core/ui"
import { useMyProfessional } from "@/shared/hooks"
import { Navigate } from "react-router-dom"
import { DurationCard } from "../components/availability/duration-card"
import { AvailabilityEditor } from "../components/availability/availability-editor"

/** Cada profissional define os próprios horários de atendimento nesta clínica. */
export function MySchedulePage() {
  const { professionalId, isProfessional, isLoading } = useMyProfessional()

  if (!isLoading && !isProfessional) return <Navigate to="/error-403" replace />

  return (
    <BaseLayout.Root title="Minha agenda" pageTitle="Configurações">
      <BaseLayout.Header isFilters={false} />
      <BaseLayout.Body>
        <>
          {professionalId && (
            <>
              <DurationCard professionalId={professionalId} />
              <AvailabilityEditor professionalId={professionalId} />
            </>
          )}
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

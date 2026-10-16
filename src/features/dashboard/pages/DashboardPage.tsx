import { BaseLayout } from "@/core/ui"
import {
  InitialSteps,
  Overview,
  ModalSelectClinic,
  ModalWelcome,
} from "@/features/dashboard/components"
import { useAuth } from "@/shared/hooks"

export function DashboardPage() {
  const { session } = useAuth()

  return (
    <BaseLayout.Root
      title={`Bem Vindo ${session?.activeClinic ? "á " + session.activeClinic.name : ""}`}
      pageTitle={"Início"}
    >
      {(session?.clinics.length === 0 || session?.user.onboardingStep !== "FINISHED") && (
        <BaseLayout.Body>
          <InitialSteps step={session!.user.onboardingStep} />
        </BaseLayout.Body>
      )}
      {session?.activeClinic && session.user.onboardingStep === "FINISHED" && (
        <BaseLayout.Body>
          <Overview />
        </BaseLayout.Body>
      )}
      {session?.clinics.length === 0 &&
        session.user.onboardingStep === "CREATE_CLINIC" && (
          <ModalWelcome
            isOpen={
              session?.clinics.length === 0 &&
              session?.user.onboardingStep === "CREATE_CLINIC"
            }
          />
        )}
      {session?.clinics && session?.clinics.length > 1 && (
        <ModalSelectClinic
          clinics={session?.clinics ?? []}
          isOpen={!session?.activeClinic}
        />
      )}
    </BaseLayout.Root>
  )
}

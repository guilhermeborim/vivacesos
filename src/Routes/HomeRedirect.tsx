import { DASHBOARD_PATH, homeOptions } from "@/core/layouts/menu-visibility"
import { useHomePage } from "@/features/settings/hooks/use-home-page"
import { useAuth, useMyProfessional } from "@/shared/hooks"
import { Navigate } from "react-router-dom"

/**
 * Para onde ir ao entrar: a tela inicial salva pelo usuário, se ele ainda puder acessá-la; senão
 * o Dashboard. Durante o onboarding (sem clínica ou sem FINISHED) é sempre o Dashboard.
 */
export function HomeRedirect() {
  const { session, hasPermission } = useAuth()
  const { isProfessional, isLoading } = useMyProfessional()
  const { homePage } = useHomePage()

  const ready = session?.activeClinic && session.user.onboardingStep === "FINISHED"
  if (!ready || homePage === DASHBOARD_PATH) return <Navigate to={DASHBOARD_PATH} replace />

  // O perfil de profissional decide se a tela salva ainda é permitida: espera carregar.
  if (isLoading) return null

  const allowed = homeOptions({ hasPermission, isProfessional, role: session.role }).some(
    (option) => option.value === homePage,
  )
  return <Navigate to={allowed ? homePage : DASHBOARD_PATH} replace />
}

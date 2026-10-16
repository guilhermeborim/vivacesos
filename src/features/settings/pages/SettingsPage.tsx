import { BaseLayout, InfoRules } from "@/core/ui"
import { useAuth } from "@/shared/hooks"
import { NotificationsSection } from "../components/notifications-section"
import { RecurringExpensesSection } from "../components/recurring-expenses-section"

/** Um só lugar para as configurações: pessoais (todos) e da clínica (conforme a permissão). */
export function SettingsPage() {
  const { hasPermission } = useAuth()

  return (
    <BaseLayout.Root title="Geral" pageTitle="Configurações">
      <BaseLayout.Header isFilters={false} />
      <BaseLayout.Body>
        <>
          <InfoRules
            rules={[
              "Aqui ficam as configurações agrupadas. Cada seção mostra só o que o seu perfil pode alterar.",
              "Notificações é uma preferência pessoal, guardada neste navegador.",
              "Despesas recorrentes é uma opção da clínica e só o ADMIN altera.",
            ]}
          />
          <NotificationsSection />
          {hasPermission("SETTINGS_MANAGE") && <RecurringExpensesSection />}
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

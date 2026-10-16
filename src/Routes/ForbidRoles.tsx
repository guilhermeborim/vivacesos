import { Loading } from "@/core/ui"
import { useAuth } from "@/shared/hooks"
import { Navigate } from "react-router-dom"

interface ForbidRolesProps {
  roles: string[]
  children: React.ReactNode
}

/** Bloqueia a rota (403) para os papéis informados; o menu também esconde o item. */
export function ForbidRoles({ roles, children }: ForbidRolesProps) {
  const { loading, session } = useAuth()

  if (loading) return <Loading loading />
  if (session && roles.includes(session.role)) return <Navigate to="/error-403" replace />

  return <>{children}</>
}

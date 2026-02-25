import { Loading } from "@/core/ui"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { Navigate } from "react-router-dom"

interface PublicProtectedProps {
  children: React.ReactNode
}

const PublicProtected = ({ children }: PublicProtectedProps) => {
  const { loading, session } = useAuth()

  console.log(loading, session)
  if (loading) {
    return <Loading loading />
  }

  if (session) return <Navigate to="/dashboard" replace />

  return <>{children}</>
}

export default PublicProtected

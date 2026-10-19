import { Loading } from "@/core/ui"
import { useAuth } from "@/shared/hooks"
import { HomeRedirect } from "./HomeRedirect"

interface PublicProtectedProps {
  children: React.ReactNode
}

const PublicProtected = ({ children }: PublicProtectedProps) => {
  const { loading, session } = useAuth()

  if (loading) {
    return <Loading loading />
  }

  if (session) return <HomeRedirect />

  return <>{children}</>
}

export default PublicProtected

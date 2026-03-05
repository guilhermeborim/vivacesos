import { AuthContext } from "@/features/auth/hooks/authContext"
import { useContext } from "react"

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}

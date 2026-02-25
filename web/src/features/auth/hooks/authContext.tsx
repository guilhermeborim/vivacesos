import { useQuerySession } from "@/core/api/shared/queries"
import { useQueryClient } from "@tanstack/react-query"
import { createContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useMutationLogin, useMutationRegister } from "../api/mutations"
import { postLogout } from "../api/routes"
import type { LoginFormTypeSchema, RegisterFormTypeSchema } from "../schemas"

interface User {
  id: string
  name: string
  email: string
  onboardingStep: "CREATE_CLINIC" | "LINK_PROFESSIONAL" | "DONE" | "FINISHED"
}

export interface Clinic {
  clinicId: string
  name: string
}

export interface activeClinic {
  id: string
  name: string
}

export interface Session {
  user: User
  clinics: Clinic[]
  activeClinic: activeClinic | null
  role: string
  permissions: string[]
}

interface AuthContextProps {
  loading: boolean
  session: Session | null
  login: (payload: LoginFormTypeSchema) => Promise<void>
  register: (payload: RegisterFormTypeSchema) => Promise<void>
  signOut: () => void
  hasPermission: (permission: any) => boolean
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError, refetch } = useQuerySession()
  const mutationLogin = useMutationLogin()
  const mutationRegister = useMutationRegister()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isError) {
      const publicPaths = [
        "/login",
        "/register",
        "/invite/accept",
        "/error-404",
        "/error-403",
        "/error-500",
      ]
      const isPublicRoute = publicPaths.some((path) =>
        window.location.pathname.startsWith(path),
      )

      if (!isPublicRoute) {
        navigate("/login")
      }
    }
  }, [isError, navigate])

  async function login(payload: LoginFormTypeSchema) {
    try {
      await mutationLogin.mutateAsync(payload)
      await refetch()
    } catch {
      toast.error("Erro ao fazer login!")
    }
  }

  async function register(payload: RegisterFormTypeSchema) {
    try {
      await mutationRegister.mutateAsync(payload)
    } catch {
      toast.error("Erro ao fazer registro!")
    }
  }

  async function signOut() {
    await postLogout()
    queryClient.setQueryData(["session"], null)
  }

  function hasPermission(permission: any): boolean {
    return data?.data?.permissions?.includes(permission) || false
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        signOut,
        register,
        session: data?.data ?? null,
        hasPermission,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

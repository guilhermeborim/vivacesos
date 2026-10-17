import { SESSION_EXPIRED_EVENT } from "@/core/api/shared/api_helper"
import { useQuerySession } from "@/core/api/shared/queries"
import { RegisterFormTypeSchema } from "@/shared/schemas"
import { ClinicAuthContext } from "@/shared/types"
import { useQueryClient } from "@tanstack/react-query"
import { createContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { postLogout, useMutationLogin, useMutationRegister } from "../api"
import type { LoginFormTypeSchema } from "../schemas"

interface User {
  id: string
  name: string
  email: string
  onboardingStep: "CREATE_CLINIC" | "LINK_PROFESSIONAL" | "DONE" | "FINISHED"
}

export interface activeClinic {
  clinicId: string
  name: string
}

export interface Session {
  user: User
  clinics: ClinicAuthContext[]
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
        "/c/",
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

  // O refresh token também expirou: encerra a sessão local (AuthProtected leva ao login).
  useEffect(() => {
    const onExpired = () => queryClient.setQueryData(["session"], null)
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired)
  }, [queryClient])

  async function login(payload: LoginFormTypeSchema) {
    try {
      await mutationLogin.mutateAsync(payload)
      await refetch()
    } catch {
      // Erro já tratado pelo onError do useMutationLogin
    }
  }

  async function register(payload: RegisterFormTypeSchema) {
    try {
      await mutationRegister.mutateAsync(payload)
    } catch {
      // Erro já tratado pelo onError do useMutationRegister
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

import { useQueryClient } from "@tanstack/react-query";
import { useQuerySession } from "core/api/shared/queries";
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Permission } from "../../../../../shared/permissions";
import { useMutationLogin, useMutationRegister } from "../api/mutations";
import { postLogout } from "../api/routes";
import type { LoginFormSchema, RegisterFormSchema } from "../schemas";

interface User {
  id: string;
  name: string;
  email: string;
  onboardingStep: "CREATE_CLINIC" | "LINK_PROFESSIONAL" | "DONE" | "FINISHED";
}

export interface Clinic {
  clinicId: string;
  name: string;
}

export interface activeClinic {
  id: string;
  name: string;
}

export interface Session {
  user: User;
  clinics: Clinic[];
  activeClinic: activeClinic | null;
  role: string;
  permissions: string[];
}

interface AuthContextProps {
  loading: boolean;
  session: Session | null;
  login: (payload: LoginFormSchema) => Promise<void>;
  register: (payload: RegisterFormSchema) => Promise<void>;
  signOut: () => void;
  hasPermission: (permission: Permission) => boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError, refetch } = useQuerySession();
  const mutationLogin = useMutationLogin();
  const mutationRegister = useMutationRegister();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError]);

  async function login(payload: LoginFormSchema) {
    try {
      await mutationLogin.mutateAsync(payload);
      await refetch();
    } catch (error) {}
  }

  async function register(payload: any) {
    try {
      await mutationRegister.mutateAsync(payload);
    } catch (error) {}
  }

  async function signOut() {
    await postLogout();
    queryClient.setQueryData(["session"], null);
  }

  function hasPermission(permission: Permission): boolean {
    return data?.data?.permissions?.includes(permission) || false;
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
  );
};

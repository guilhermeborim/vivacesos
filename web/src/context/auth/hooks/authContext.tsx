import { AxiosError } from "axios";
import {
  getSession,
  postLogin,
  postLogout,
  postRegister,
} from "helpers/backend_helper";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Permission } from "../../../../../shared/permissions";
import type { LoginFormSchema, RegisterFormSchema } from "../schemas";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Clinic {
  clinic_id: string;
  name: string;
}

export interface Session {
  user: User;
  clinics: Clinic;
  role: string;
  permissions: string[];
}

interface AuthContextProps {
  loading: boolean;
  session: Session | null;
  login: (payload: LoginFormSchema) => Promise<void>;
  register: (payload: RegisterFormSchema) => Promise<void>;
  loadSession: () => Promise<void>;
  signOut: () => void;
  hasPermission: (permission: Permission) => boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    setLoading(true);
    try {
      const response = await getSession();
      setSession(response.data);
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(payload: LoginFormSchema) {
    try {
      await postLogin(payload);
      await loadSession();
      toast.success("Conectado com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao autenticar");
      }
    }
  }

  async function register(payload: any) {
    try {
      const response = await postRegister(payload);
      if (response.status === 201) {
        toast.success("Cadastrado com sucesso!");
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao registrar");
      }
    }
  }

  async function signOut() {
    await postLogout();
    setSession(null);
  }

  function hasPermission(permission: Permission): boolean {
    return session?.permissions?.includes(permission) || false;
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        signOut,
        register,
        session,
        hasPermission,
        loadSession,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

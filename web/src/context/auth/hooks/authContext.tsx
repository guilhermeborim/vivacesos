import { AxiosError } from "axios";
import {
  getToken,
  removeClinic,
  removeToken,
  saveClinic,
  saveToken,
  setAuthTokenHeader,
} from "helpers/api_helper";
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
import type { LoginFormSchema } from "../schemas";

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
  token: string | null;
  session: Session | null;
  login: (payload: LoginFormSchema) => Promise<void>;
  register: (payload: any) => Promise<void>;
  signOut: () => void;
  hasPermission: (permission: Permission) => boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        setAuthTokenHeader(token);
        loadSession();
      } catch (error) {
        console.error("Token inválido:", error);
      }
    }
  }, [token]);

  async function loadSession() {
    const session = await getSession();
    setSession(session.data);
  }

  async function login(payload: LoginFormSchema) {
    try {
      const response = await postLogin(payload);
      const token = response.data.token;
      const clinics = response.data.clinics;

      saveToken(token);
      saveClinic(clinics[0].clinic_id);

      await loadSession();

      toast.success("Conectado com sucesso!");
      navigate("/dashboard");
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
        toast.success("Cadastro com sucesso!");
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
    removeToken();
    removeClinic();
    setSession(null);
    navigate("/login");
  }

  function hasPermission(permission: Permission): boolean {
    return session?.permissions.includes(permission) || false;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        signOut,
        register,
        session,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

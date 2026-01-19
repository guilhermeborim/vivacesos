import { useAuth } from "context/auth/hooks/use-auth";
import { getClinic, getToken, setAuthTokenHeader } from "helpers/api_helper";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

interface AuthProtectedProps {
  children: React.ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  const { signOut } = useAuth();
  const token = getToken();
  const clinic = getClinic();

  useEffect(() => {
    if (!clinic) {
      // TODO: tratar esse caso quando nao tiver clinica salva, talvez redirecionar pra uma pagina/modal de selecao de clinica
      console.log("sem clinica");
    }
    if (token) {
      setAuthTokenHeader(token);
    } else {
      signOut();
    }
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default AuthProtected;

import { useAuth } from "features/auth/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { Loading } from "shared/components";

interface AuthProtectedProps {
  children: React.ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  const { loading, session } = useAuth();

  if (loading) {
    return <Loading loading />;
  }
  if (session?.clinics.length === 0) {
    console.log(`sem clinica`);
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthProtected;

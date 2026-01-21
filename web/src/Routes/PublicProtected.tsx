import { Loading } from "Components/Common/Loading";
import { useAuth } from "context/auth/hooks/use-auth";
import { Navigate } from "react-router-dom";

interface PublicProtectedProps {
  children: React.ReactNode;
}

const PublicProtected: React.FC<PublicProtectedProps> = ({ children }) => {
  const { loading, session } = useAuth();

  if (loading) {
    return <Loading loading />;
  }

  if (session) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};

export default PublicProtected;

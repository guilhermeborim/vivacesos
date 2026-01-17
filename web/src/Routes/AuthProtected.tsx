import { setAuthorization, signOut } from "helpers/api_helper";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

interface AuthProtectedProps {
  permissions?: { subject: string; action: string | string[] }[];
  children: React.ReactNode;
}

export const getPermissions = (
  subject: string,
  requiredActions: string[] = []
) => {
  const userData: any = localStorage.getItem("auth");
  const token = typeof userData === "string" ? userData : userData?.token;
  if (!token) return;

  const decoded: any = jwtDecode(token);
  const userPermissions = decoded.permissions || [];
  const subjectPermissions = userPermissions.filter(
    (perm: any) => perm.subject === subject
  );

  if (subjectPermissions.length === 0) return false;

  return requiredActions.every((action) =>
    subjectPermissions.some((perm: any) => perm.action === action)
  );
};

const AuthProtected: React.FC<AuthProtectedProps> = ({
  permissions = [],
  children,
}) => {
  const authData = localStorage.getItem("auth");
  const token = authData ? JSON.parse(authData).token : null;

  useEffect(() => {
    if (token) {
      setAuthorization(token);
    } else {
      signOut();
    }
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  if (permissions.length > 0) {
    const hasAccess = permissions.some(({ subject, action }) =>
      getPermissions(subject, Array.isArray(action) ? action : [action])
    );

    return hasAccess ? children : <Navigate to="/error-403" replace />;
  }

  return <>{children}</>;
};

export default AuthProtected;

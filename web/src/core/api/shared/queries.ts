import { useQuery } from "@tanstack/react-query";
import { getSession } from "features/auth/api/routes";
import { useLocation } from "react-router-dom";

export function useQuerySession() {
  const location = useLocation();
  const isPublicRoute = ["/login", "/register", "/invite/accept"].includes(
    location.pathname,
  );

  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    retry: false,
    enabled: !isPublicRoute,
  });
}

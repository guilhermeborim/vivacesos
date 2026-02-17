import { Navigate } from "react-router-dom";

// Errors
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ClinicCreatePage } from "@/features/clinic/pages/ClinicCreatePage";
import { ClinicListPage } from "@/features/clinic/pages/ClinicListPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { Error403Page } from "@/features/errors/pages/Error403Page";
import { Error404Page } from "@/features/errors/pages/Error404Page";
import { Error500Page } from "@/features/errors/pages/Error500Page";
import { InvitePage } from "@/features/invite/pages/InvitePage";
import { PatientListPage } from "@/features/patient/pages/PatientListPage";
import { ProfessionalListPage } from "@/features/professional/pages/ProfessionalListPage";
import { UserListPage } from "@/features/users/pages/UserListPage";

const authProtectedRoutes = [
  { path: "*", component: <Navigate to="/error-404" /> },
  {
    path: "/dashboard",
    component: <DashboardPage />,
  },
  {
    path: "/",
    component: <Navigate to={"/dashboard"} />,
  },
  {
    path: "/clinics",
    component: <ClinicListPage />,
  },
  {
    path: "/clinics/create",
    component: <ClinicCreatePage />,
  },
  {
    path: "/professionals",
    component: <ProfessionalListPage />,
  },
  {
    path: "/users",
    component: <UserListPage />,
  },
  {
    path: "/patients",
    component: <PatientListPage />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/login", component: <LoginPage /> },
  { path: "/invite/accept", component: <InvitePage /> },
  { path: "/register", component: <RegisterPage /> },
  { path: "/error-404", component: <Error404Page /> },
  { path: "/error-403", component: <Error403Page /> },
  { path: "/error-500", component: <Error500Page /> },
];

export { authProtectedRoutes, publicRoutes };

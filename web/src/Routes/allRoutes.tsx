import { Navigate } from "react-router-dom";

// Errors
import Cover404 from "../pages/errors/Cover404";
import Error403 from "../pages/errors/Error403";
import Error500 from "../pages/errors/Error500";

import Register from "pages/auth/register";
import ClinicList from "pages/clinic";
import ClinicCreate from "pages/clinic/create";
import Dashboard from "pages/dashboard";
import Login from "../pages/auth/login";

const authProtectedRoutes = [
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/",
    component: <Navigate to={"/dashboard"} />,
  },
  {
    path: "/clinics",
    component: <ClinicList />,
  },
  {
    path: "/clinics/create",
    component: <ClinicCreate />,
  },
  { path: "*", component: <Navigate to="/error-404" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/error-404", component: <Cover404 /> },
  { path: "/error-403", component: <Error403 /> },
  { path: "/error-500", component: <Error500 /> },
];

export { authProtectedRoutes, publicRoutes };

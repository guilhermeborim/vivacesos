import { Navigate } from "react-router-dom"
import { ForbidRoles } from "./ForbidRoles"

// Errors
import { LoginPage } from "@/features/auth/pages/LoginPage"
import { RegisterPage } from "@/features/auth/pages/RegisterPage"
import { AppointmentListPage } from "@/features/appointment/pages/AppointmentListPage"
import { ClinicListPage } from "@/features/clinic/pages/ClinicListPage"
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage"
import { Error403Page } from "@/features/errors/pages/Error403Page"
import { Error404Page } from "@/features/errors/pages/Error404Page"
import { Error500Page } from "@/features/errors/pages/Error500Page"
import { ExpensesPage } from "@/features/finance/pages/ExpensesPage"
import { RevenuesPage } from "@/features/finance/pages/RevenuesPage"
import { SummaryPage } from "@/features/finance/pages/SummaryPage"
import { AppointmentLinkPage } from "@/features/public/pages/AppointmentLinkPage"
import { GooglePage } from "@/features/integrations/pages/GooglePage"
import { WhatsappPage } from "@/features/integrations/pages/WhatsappPage"
import { InvitePage } from "@/features/invite/pages/InvitePage"
import { MedicalRecordDayPage } from "@/features/medical-record/pages/MedicalRecordDayPage"
import { MedicalRecordEntryPage } from "@/features/medical-record/pages/MedicalRecordEntryPage"
import { MedicalRecordListPage } from "@/features/medical-record/pages/MedicalRecordListPage"
import { SettingsPage } from "@/features/settings/pages/SettingsPage"
import { RecordAuditPage } from "@/features/medical-record/pages/RecordAuditPage"
import { RecordTemplatesPage } from "@/features/medical-record/pages/RecordTemplatesPage"
import { MedicalRecordPage } from "@/features/medical-record/pages/MedicalRecordPage"
import { PatientListPage } from "@/features/patient/pages/PatientListPage"
import { MySchedulePage } from "@/features/professional/pages/MySchedulePage"
import { ProfessionalListPage } from "@/features/professional/pages/ProfessionalListPage"
import { UserListPage } from "@/features/users/pages/UserListPage"

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
    component: (
      <ForbidRoles roles={["PROFISSIONAL"]}>
        <ClinicListPage />
      </ForbidRoles>
    ),
  },
  {
    path: "/professionals",
    component: (
      <ForbidRoles roles={["PROFISSIONAL"]}>
        <ProfessionalListPage />
      </ForbidRoles>
    ),
  },
  {
    path: "/users",
    component: (
      <ForbidRoles roles={["PROFISSIONAL"]}>
        <UserListPage />
      </ForbidRoles>
    ),
  },
  {
    path: "/patients",
    component: <PatientListPage />,
  },
  {
    path: "/appointments",
    component: <AppointmentListPage />,
  },
  {
    path: "/medical-record",
    component: <MedicalRecordListPage />,
  },
  {
    path: "/medical-record/now",
    component: <MedicalRecordDayPage />,
  },
  {
    path: "/google",
    component: <GooglePage />,
  },
  {
    path: "/whatsapp",
    component: <WhatsappPage />,
  },
  {
    path: "/settings/my-schedule",
    component: <MySchedulePage />,
  },
  {
    path: "/settings",
    component: <SettingsPage />,
  },
  {
    path: "/settings/recurring-expenses",
    component: <Navigate to="/settings" replace />,
  },
  {
    path: "/settings/record-templates",
    component: <RecordTemplatesPage />,
  },
  {
    path: "/medical-record/audit",
    component: <RecordAuditPage />,
  },
  {
    path: "/medical-record/:patientId/new",
    component: <MedicalRecordEntryPage />,
  },
  {
    path: "/medical-record/:patientId",
    component: <MedicalRecordPage />,
  },
  {
    path: "/receitas",
    component: <RevenuesPage />,
  },
  {
    path: "/despesas",
    component: <ExpensesPage />,
  },
  {
    path: "/relatorio",
    component: <SummaryPage />,
  },
]

const publicRoutes = [
  { path: "/login", component: <LoginPage /> },
  { path: "/invite/accept", component: <InvitePage /> },
  { path: "/register", component: <RegisterPage /> },
  { path: "/error-404", component: <Error404Page /> },
  { path: "/error-403", component: <Error403Page /> },
  { path: "/error-500", component: <Error500Page /> },
]

/** Abertas a qualquer pessoa, logada ou não (ex.: paciente com o link da consulta). */
const openRoutes = [{ path: "/c/:token", component: <AppointmentLinkPage /> }]

export { authProtectedRoutes, publicRoutes, openRoutes }

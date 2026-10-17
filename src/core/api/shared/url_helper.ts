//AUTH
export const POST_LOGIN = "/auth/login"
export const POST_REGISTER = "/auth/register"
export const GET_SESSION = "/auth/session"
export const POST_REFRESH_TOKEN = "/auth/refresh"
export const POST_LOGOUT = "/auth/logout"
export const POST_NEXT_STEP = "/auth/session/next-step"

//SELECT_CLINIC
export const POST_SELECT_CLINIC = "/auth/session/select-clinic"

//CLINIC
export const POST_CLINIC = "/clinic/register"
export const GET_CLINIC_BY_ID = "/clinic/:clinicId"
export const PUT_CLINIC_BY_ID = "/clinic/:clinicId"

//PROFESSIONAL
export const POST_PROFESSIONAL_ONBOARDING = "/professional/onboarding"
export const POST_PROFESSIONAL = "/clinic/professionals"
export const GET_PROFESSIONALS = "/clinic/professionals"
export const GET_PROFESSIONAL_BY_ID = "/clinic/professionals/:professionalId"
export const PUT_PROFESSIONAL_BY_ID = "/clinic/professionals/:professionalId"
//CLINIC_USER
export const GET_CLINICS_BY_USER = "/clinics"
export const GET_USERS_BY_CLINIC = "/clinic/users"
export const GET_USER_BY_ID = "/clinic/users/:userId"
export const PUT_USER_BY_ID = "/clinic/users/:userId"
export const PATCH_STATUS_BY_USER_ID = "/clinic/users/:userId/status"

//INVITE
export const POST_INVITE = "/invite"
export const GET_INVITE_BY_TOKEN = "/invite/:token"
export const POST_INVITE_RESEND = "/invite/:inviteId/resend"

// PATIENT
export const POST_PATIENT = "/clinic/patient"
export const GET_PATIENTS = "/clinic/patients"
export const GET_PATIENT_BY_ID = "/clinic/patients/:patientId"
export const PUT_PATIENT_BY_ID = "/clinic/patients/:patientId"

// APPOINTMENT
export const POST_APPOINTMENT = "/clinic/appointments"
export const GET_APPOINTMENTS = "/clinic/appointments"
export const GET_APPOINTMENT_BY_ID = "/clinic/appointments/:appointmentId"
export const PUT_APPOINTMENT_BY_ID = "/clinic/appointments/:appointmentId"
export const PATCH_APPOINTMENT_STATUS = "/clinic/appointments/:appointmentId/status"

// FINANCE
export const GET_REVENUES = "/clinic/finance/revenues"
export const GET_FINANCE_SUMMARY = "/clinic/finance/summary"
export const POST_EXPENSE = "/clinic/finance/expenses"
export const GET_EXPENSES = "/clinic/finance/expenses"
export const PUT_EXPENSE_BY_ID = "/clinic/finance/expenses/:expenseId"
export const PATCH_EXPENSE_PAYMENT = "/clinic/finance/expenses/:expenseId/payment"
export const DELETE_EXPENSE_BY_ID = "/clinic/finance/expenses/:expenseId"
export const PATCH_APPOINTMENT_PAYMENT = "/clinic/appointments/:appointmentId/payment"

// MEDICAL RECORD
export const GET_MEDICAL_RECORDS = "/clinic/medical-records"
export const GET_MEDICAL_RECORDS_DAY = "/clinic/medical-records/day"
export const GET_MEDICAL_RECORD_BY_PATIENT = "/clinic/medical-records/:patientId"
export const POST_MEDICAL_RECORD_ENTRY = "/clinic/medical-records/:patientId/entries"
export const POST_MEDICAL_RECORD_ENTRY_CANCEL = "/clinic/medical-records/entries/:entryId/cancel"
export const GET_RECORD_TEMPLATES = "/clinic/medical-records/templates"
export const POST_RECORD_TEMPLATE = "/clinic/medical-records/templates"
export const PUT_RECORD_TEMPLATE_BY_ID = "/clinic/medical-records/templates/:templateId"
export const DELETE_RECORD_TEMPLATE_BY_ID = "/clinic/medical-records/templates/:templateId"
export const GET_RECORD_AUDIT = "/clinic/medical-records/audit"
export const GET_APPOINTMENT_ENTRY_STATUS = "/clinic/medical-records/appointments/:appointmentId/entry-status"

// DASHBOARD
export const GET_DASHBOARD = "/clinic/dashboard"
export const GET_DASHBOARD_ANALYTICS = "/clinic/dashboard/analytics"

// PAYOUT (repasse)
export const GET_PAYOUT_PREVIEW = "/clinic/finance/payouts/preview"
export const POST_PAYOUT = "/clinic/finance/payouts"
export const GET_PAYOUTS = "/clinic/finance/payouts"
export const DELETE_PAYOUT_BY_ID = "/clinic/finance/payouts/:payoutId"

// NOTIFICATIONS
export const GET_NOTIFICATIONS = "/clinic/notifications"
export const DELETE_NOTIFICATIONS = "/clinic/notifications"
export const POST_NOTIFICATIONS_READ_ALL = "/clinic/notifications/read-all"
export const PATCH_NOTIFICATION_READ = "/clinic/notifications/:notificationId/read"

// CLINICAL PROFILE (dados básicos do paciente)
export const GET_CLINICAL_PROFILE = "/clinic/medical-records/:patientId/profile"
export const PUT_CLINICAL_PROFILE = "/clinic/medical-records/:patientId/profile"

// TRIAGEM (sinais vitais da consulta)
export const GET_TRIAGE = "/clinic/medical-records/appointments/:appointmentId/triage"
export const PUT_TRIAGE = "/clinic/medical-records/appointments/:appointmentId/triage"

// SETTINGS
export const GET_SETTINGS = "/clinic/settings"
export const PUT_SETTINGS = "/clinic/settings"
export const POST_STOP_EXPENSE_RECURRENCE = "/clinic/finance/expenses/:expenseId/stop-recurrence"

// AVAILABILITY (horários de atendimento)
export const GET_PROFESSIONAL_AVAILABILITY = "/clinic/professionals/:professionalId/availability"
export const PUT_PROFESSIONAL_AVAILABILITY = "/clinic/professionals/:professionalId/availability"
export const GET_APPOINTMENT_SLOTS = "/clinic/appointments/slots"
export const GET_APPOINTMENT_AGENDA = "/clinic/appointments/agenda"
export const GET_APPOINTMENT_AGENDA_DAYS = "/clinic/appointments/agenda/days"

// INTEGRATIONS / MENSAGENS AO PACIENTE
export const GET_INTEGRATIONS = "/clinic/integrations"
export const POST_APPOINTMENT_MESSAGE = "/clinic/appointments/:appointmentId/message"
export const GET_PUBLIC_APPOINTMENT = "/public/appointments/:token"
export const POST_PUBLIC_APPOINTMENT_CONFIRM = "/public/appointments/:token/confirm"
export const POST_PUBLIC_APPOINTMENT_CANCEL = "/public/appointments/:token/cancel"

// GOOGLE AGENDA
export const GET_GOOGLE_STATUS = "/clinic/integrations/google"
export const GET_GOOGLE_AUTH_URL = "/clinic/integrations/google/auth-url"
export const POST_GOOGLE_DISCONNECT = "/clinic/integrations/google/disconnect"
export const POST_GOOGLE_SYNC_ALL = "/clinic/integrations/google/sync-all"
export const GET_GOOGLE_PROFESSIONALS = "/clinic/integrations/google/professionals"
export const POST_GOOGLE_PROFESSIONAL_CALENDAR =
  "/clinic/integrations/google/professionals/:professionalId/calendar"

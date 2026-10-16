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

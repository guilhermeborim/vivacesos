//AUTH
export const POST_LOGIN = "/auth/login";
export const POST_REGISTER = "/auth/register";
export const GET_SESSION = "/auth/session";
export const POST_REFRESH_TOKEN = "/auth/refresh";
export const POST_LOGOUT = "/auth/logout";
export const POST_NEXT_STEP = "/auth/session/next-step";

//SELECT_CLINIC
export const POST_SELECT_CLINIC = "/auth/session/select-clinic";

//CLINIC
export const POST_CLINIC = "/clinic/register";
export const GET_CLINIC_BY_ID = "/clinic/:clinicId";
export const PUT_CLINIC_BY_ID = "/clinic/:clinicId";

//PROFESSIONAL
export const POST_PROFESSIONAL_ONBOARDING = "/professional/onboarding";
export const POST_PROFESSIONAL = "/clinic/professionals";
export const GET_PROFESSIONALS = "/clinic/professionals";
//CLINIC_USER
export const GET_CLINICS_BY_USER = "/clinics";
export const GET_USERS_BY_CLINIC = "/clinic/users";

//INVITE
export const POST_INVITE = "/invite";
export const GET_INVITE_BY_TOKEN = "/invite/:token";

// PATIENT
export const POST_PATIENT = "/clinic/patient";
export const GET_PATIENTS = "/clinic/patients";
export const GET_PATIENT_BY_ID = "/clinic/:patientId";

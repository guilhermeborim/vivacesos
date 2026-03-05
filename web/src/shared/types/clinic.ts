import { ClinicUserStatus, Role } from "../enums"

export type Clinic = {
  id: string
  role: Role
  status: ClinicUserStatus
  clinic: {
    name: string
    city: string
    clinicId: string
  }
}

export type ClinicAuthContext = {
  clinicId: string
  name: string
}

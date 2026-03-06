import { ClinicUserStatus, Role } from "../enums"

export type Clinic = {
  id: string
  role: Role
  status: ClinicUserStatus
  clinic: {
    clinicId: string
    name: string
    cnpj: string
    city: string
    phone: string
    road: string
    number: string
    complement?: string | null
    cep: string
    neighborhood: string
  }
}

export type ClinicAuthContext = {
  clinicId: string
  name: string
}

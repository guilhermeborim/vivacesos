export type Patient = {
  clinicId: string
  patients: {
    patientId: string
    name: string
    email: string
    cpf: string
    phone: boolean
    birthDate: string | Date
    active: boolean
  }
}

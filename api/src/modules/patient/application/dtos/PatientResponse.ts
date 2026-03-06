export type GetPatientsResponse = {
  clinicId: string
  patients: {
    patientId: string
    name: string
    email: string
    cpf: string
    phone: string
    birthDate: Date
    active: boolean
  }
}

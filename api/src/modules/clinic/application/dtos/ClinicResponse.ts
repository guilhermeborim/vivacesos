export interface GetClinicByIdResponse {
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

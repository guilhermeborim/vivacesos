export interface ClinicCreateParams {
  name: string
  cnpj: string
  cnpjHash?: string
  phone: string
  cep: string
  number: string
  complement?: string
  road: string
  neighborhood: string
  city: string
  active?: boolean
}

export interface ClinicUpdateParams {
  name?: string | null
  cnpj?: string | null
  cnpjHash?: string | null
  phone?: string | null
  cep?: string | null
  number?: string | null
  complement?: string | null
  road?: string | null
  neighborhood?: string | null
  city?: string | null
  active?: boolean | null
}

export type CreatePatientParams = {
  name: string
  email: string
  cpf: string
  cpfHash?: string | null
  phoneHash?: string | null
  phone: string
  birthDate: Date | string
  active?: boolean
}

export interface UpdatePatientParams {
  name?: string
  email?: string
  cpf?: string
  cpfHash?: string | null
  phone?: string
  phoneHash?: string | null
  birthDate?: Date | string
  active?: boolean
}

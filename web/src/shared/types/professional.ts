import { Type } from "../enums"

export type Professional = {
  id: string
  clinicId: string
  userId: string
  professional: {
    name: string
    specialty: string
    type: Type
    active: boolean
  }
}

import { FieldConfig } from "@/shared/forms"
import { CreateInviteTypeSchema, UpdateUserTypeSchema } from "../../schemas"

export const inviteFields: FieldConfig<CreateInviteTypeSchema>[] = [
  {
    name: "email",
    label: "E-mail",
    placeholder: "example@example.com",
    type: "text",
  },
  {
    name: "role",
    label: "Cargo",
    type: "select",
    placeholder: "Selecione...",
    options: [
      { label: "Profissional", value: "PROFISSIONAL" },
      { label: "Recepcionista", value: "RECEPCIONISTA" },
    ],
  },
]

export const editFields: FieldConfig<UpdateUserTypeSchema>[] = [
  {
    name: "name",
    label: "Nome",
    placeholder: "Nome do usuário",
    type: "text",
  },
]

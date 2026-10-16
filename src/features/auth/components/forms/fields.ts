import { FieldConfig } from "@/shared/forms"
import { RegisterFormTypeSchema } from "@/shared/schemas/auth"
import { LoginFormTypeSchema } from "../../schemas"

export const loginFields: FieldConfig<LoginFormTypeSchema>[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "example@example.com",
    type: "email",
  },
]

export const registerFields: FieldConfig<RegisterFormTypeSchema>[] = [
  {
    name: "name",
    label: "Nome",
    placeholder: "Seu nome",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "example@example.com",
    type: "text",
  },
]

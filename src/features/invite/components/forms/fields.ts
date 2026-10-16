import { FieldConfig } from "@/shared/forms"
import { RegisterFormTypeSchema } from "@/shared/schemas/auth"

export const fields: FieldConfig<RegisterFormTypeSchema>[] = [
  {
    name: "name",
    label: "Nome",
    placeholder: "Seu nome",
    type: "text",
  },
]

import { FieldConfig } from "@/shared/forms"
import { CreateProfessionalOnboardingTypeSchema } from "../../schemas"

export const fields: FieldConfig<CreateProfessionalOnboardingTypeSchema>[] = [
  {
    name: "type",
    type: "select",
    options: [
      { label: "Médico", value: "MEDICO" },
      { label: "Mais categorias em breve!", value: "", isDisabled: true },
    ],
    label: "Tipo de Profissional",
    disabled: true,
  },
  {
    name: "crm",
    label: "CRM",
    placeholder: "CRM do Profissional",
    minLength: 5,
    maxLength: 10,
    type: "text",
  },
  {
    name: "specialty",
    label: "Especialidade",
    placeholder: "Especialidade do Profissional",
    type: "text",
    maxLength: 30,
  },
]

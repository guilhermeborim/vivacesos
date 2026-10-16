import z from "zod"

export const createEntrySchema = z.object({
  appointmentId: z.uuid("Selecione a consulta").optional(),
  parentEntryId: z.uuid().optional(),
  /** Só da tela: conclui a consulta depois de registrar a ficha (não vai para a API). */
  concludeAppointment: z.boolean().optional(),
  content: z
    .string("O conteúdo é obrigatório")
    .trim()
    .min(1, "O conteúdo é obrigatório")
    .max(20000, "O conteúdo deve ter no máximo 20000 caracteres"),
})

export type CreateEntryTypeSchema = z.infer<typeof createEntrySchema>

export const cancelEntrySchema = z.object({
  reason: z
    .string("A justificativa é obrigatória")
    .trim()
    .min(5, "A justificativa deve ter ao menos 5 caracteres")
    .max(2000, "A justificativa deve ter no máximo 2000 caracteres"),
})

export type CancelEntryTypeSchema = z.infer<typeof cancelEntrySchema>

export const templateSchema = z.object({
  name: z
    .string("O nome é obrigatório")
    .trim()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  content: z
    .string("O conteúdo é obrigatório")
    .trim()
    .min(1, "O conteúdo é obrigatório")
    .max(20000, "O conteúdo deve ter no máximo 20000 caracteres"),
})

export type TemplateTypeSchema = z.infer<typeof templateSchema>

const emptyToNull = (v: unknown) => (v === "" || v === undefined || v === null ? null : v)

/** Formulário dos dados básicos: campos vazios viram `null`. */
export const clinicalProfileFormSchema = z.object({
  heightCm: z.preprocess(
    (v) => (emptyToNull(v) === null ? null : Number(v)),
    z
      .number("A altura deve ser um número")
      .min(50, "A altura deve ser de, no mínimo, 50 cm")
      .max(260, "A altura deve ser de, no máximo, 260 cm")
      .nullable(),
  ),
  weightKg: z.preprocess(
    (v) => (emptyToNull(v) === null ? null : Number(v)),
    z
      .number("O peso deve ser um número")
      .min(1, "O peso deve ser de, no mínimo, 1 kg")
      .max(500, "O peso deve ser de, no máximo, 500 kg")
      .nullable(),
  ),
  diabetes: z.enum(["SIM", "NAO", "NA"]).nullable().optional(),
  drugAllergies: z.preprocess(
    (v) => emptyToNull(v),
    z.string().trim().max(2000, "Máximo de 2000 caracteres").nullable(),
  ),
  otherInfo: z.preprocess(
    (v) => emptyToNull(v),
    z.string().trim().max(2000, "Máximo de 2000 caracteres").nullable(),
  ),
})

export type ClinicalProfileFormValues = z.input<typeof clinicalProfileFormSchema>
export type ClinicalProfileFormOutput = z.output<typeof clinicalProfileFormSchema>

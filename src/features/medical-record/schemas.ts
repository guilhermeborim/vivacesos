import z from "zod"

export const createEntrySchema = z.object({
  appointmentId: z.uuid("Selecione a consulta").optional(),
  content: z
    .string("O conteúdo é obrigatório")
    .trim()
    .min(1, "O conteúdo é obrigatório")
    .max(20000, "O conteúdo deve ter no máximo 20000 caracteres"),
})

const optionalText = (max: number) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z
      .string()
      .trim()
      .max(max, `Máximo de ${max} caracteres`)
      .nullish()
      .transform((v) => v ?? undefined),
  )

export const prescriptionFormSchema = z.object({
  medication: z
    .string("O medicamento é obrigatório")
    .trim()
    .min(1, "O medicamento é obrigatório")
    .max(200, "O medicamento deve ter no máximo 200 caracteres"),
  dose: optionalText(50),
  unit: optionalText(30),
  frequency: optionalText(100),
  duration: optionalText(100),
  instructions: optionalText(500),
})

export const examFormSchema = z.object({
  name: z
    .string("O exame é obrigatório")
    .trim()
    .min(1, "O exame é obrigatório")
    .max(200, "O exame deve ter no máximo 200 caracteres"),
  notes: optionalText(500),
})

export const certificateFormSchema = z.object({
  days: z.preprocess(
    (v) => (v === "" || v === undefined || v === null ? undefined : Number(v)),
    z
      .number("Os dias devem ser um número")
      .int("Os dias devem ser inteiros")
      .min(1, "Informe ao menos 1 dia")
      .max(365, "Máximo de 365 dias")
      .optional(),
  ),
  cid: optionalText(10),
  text: z
    .string("O texto do atestado é obrigatório")
    .trim()
    .min(1, "O texto do atestado é obrigatório")
    .max(2000, "O texto deve ter no máximo 2000 caracteres"),
})

export const referralFormSchema = z.object({
  specialty: z
    .string("A especialidade é obrigatória")
    .trim()
    .min(1, "A especialidade é obrigatória")
    .max(100, "A especialidade deve ter no máximo 100 caracteres"),
  reason: optionalText(1000),
})

export type CertificateFormValues = z.input<typeof certificateFormSchema>
export type CertificateFormOutput = z.output<typeof certificateFormSchema>
export type ReferralFormValues = z.input<typeof referralFormSchema>
export type ReferralFormOutput = z.output<typeof referralFormSchema>

export type PrescriptionFormValues = z.input<typeof prescriptionFormSchema>
export type PrescriptionFormOutput = z.output<typeof prescriptionFormSchema>
export type ExamFormValues = z.input<typeof examFormSchema>
export type ExamFormOutput = z.output<typeof examFormSchema>

export type CreateEntryTypeSchema = z.infer<typeof createEntrySchema>

/** O que vai para a API: a ficha mais as prescrições e exames montados na tela. */
export type CreateEntryPayload = CreateEntryTypeSchema & {
  prescriptions?: PrescriptionFormOutput[]
  exams?: ExamFormOutput[]
  certificates?: CertificateFormOutput[]
  referrals?: ReferralFormOutput[]
}

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

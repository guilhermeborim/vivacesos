import z from "zod"

const emptyToNull = (v: unknown) => (v === "" || v === undefined || v === null ? null : v)

const measure = (label: string, min: number, max: number, integer = true) =>
  z.preprocess(
    (v) => (emptyToNull(v) === null ? null : Number(v)),
    (integer
      ? z.number(`${label} deve ser um número`).int(`${label} deve ser inteiro`)
      : z.number(`${label} deve ser um número`)
    )
      .min(min, `${label}: mínimo de ${min}`)
      .max(max, `${label}: máximo de ${max}`)
      .nullable(),
  )

/** Formulário da triagem: campos vazios viram `null`. */
export const triageFormSchema = z
  .object({
    systolic: measure("A sistólica", 40, 300),
    diastolic: measure("A diastólica", 20, 200),
    heartRate: measure("Os batimentos", 20, 300),
    respiratoryRate: measure("A frequência respiratória", 5, 80),
    temperatureC: measure("A temperatura", 30, 45, false),
    spo2: measure("A saturação", 50, 100),
    weightKg: measure("O peso", 1, 500, false),
    heightCm: measure("A altura", 50, 260, false),
    notes: z.preprocess(
      (v) => emptyToNull(v),
      z.string().trim().max(2000, "Máximo de 2000 caracteres").nullable(),
    ),
  })
  .refine((v) => v.systolic === null || v.diastolic === null || v.systolic > v.diastolic, {
    message: "A sistólica deve ser maior que a diastólica",
    path: ["systolic"],
  })

export type TriageFormValues = z.input<typeof triageFormSchema>
export type TriageFormOutput = z.output<typeof triageFormSchema>

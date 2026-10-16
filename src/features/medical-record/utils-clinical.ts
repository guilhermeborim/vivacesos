/** IMC (kg/m²) com uma casa; `null` se faltar altura ou peso. */
export function calcBmi(heightCm: number | null, weightKg: number | null) {
  if (!heightCm || !weightKg) return null
  const meters = heightCm / 100
  return Math.round((weightKg / (meters * meters)) * 10) / 10
}

/** Faixas da OMS (informativo, não é diagnóstico). */
export function bmiLabel(bmi: number) {
  if (bmi < 18.5) return "Abaixo do peso"
  if (bmi < 25) return "Peso normal"
  if (bmi < 30) return "Sobrepeso"
  return "Obesidade"
}

export const diabetesLabel = { SIM: "Sim", NAO: "Não", NA: "N/A" } as const

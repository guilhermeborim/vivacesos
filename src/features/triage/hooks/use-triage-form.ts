import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutationTriage } from "../api/mutations"
import { useQueryTriage } from "../api/queries"
import { triageFormSchema, TriageFormOutput, TriageFormValues } from "../schemas"

/** Formulário da triagem de uma consulta, preenchido com o valor atual. */
export function useTriageForm(appointmentId: string, onSaved?: () => void) {
  const { triage, loadingTriage } = useQueryTriage(appointmentId)
  const mutation = useMutationTriage(appointmentId)
  const form = useForm<TriageFormValues, unknown, TriageFormOutput>({
    resolver: zodResolver(triageFormSchema),
  })

  useEffect(() => {
    if (!triage) return
    const t = triage.triage
    form.reset({
      systolic: t.systolic ?? "",
      diastolic: t.diastolic ?? "",
      heartRate: t.heartRate ?? "",
      respiratoryRate: t.respiratoryRate ?? "",
      temperatureC: t.temperatureC ?? "",
      spo2: t.spo2 ?? "",
      weightKg: t.weightKg ?? "",
      heightCm: t.heightCm ?? "",
      notes: t.notes ?? "",
    })
  }, [triage, form])

  const submit = form.handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values)
      onSaved?.()
    } catch {
      // Erro já tratado no onError da mutation
    }
  })

  return { form, triage, loadingTriage, submit, isPending: mutation.isPending }
}

import { ButtonPrimitive } from "@/core/ui"
import { formatDateTime } from "@/shared/utils"
import { FormProvider } from "react-hook-form"
import { Card, CardBody } from "reactstrap"
import { useTriageForm } from "../hooks/use-triage-form"
import { TriageFields } from "./triage-fields"

/** Triagem da consulta dentro do atendimento (aba Triagem). */
export function TriagePanel({ appointmentId }: { appointmentId: string }) {
  const { form, triage, loadingTriage, submit, isPending } = useTriageForm(appointmentId)

  return (
    <Card className="border">
      <CardBody>
        <FormProvider {...form}>
          <form onSubmit={submit}>
            <TriageFields />
            <div className="d-flex align-items-center justify-content-between mt-3">
              <small className="text-muted">
                {triage?.updatedAt
                  ? `Atualizada em ${formatDateTime(triage.updatedAt)}${triage.updatedBy ? ` por ${triage.updatedBy.name}` : ""}`
                  : "Ainda não registrada"}
              </small>
              <ButtonPrimitive type="submit" isLoading={isPending}>
                Salvar triagem
              </ButtonPrimitive>
            </div>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  )
}

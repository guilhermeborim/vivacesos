import { BaseLayout, ButtonPrimitive, InfoRules } from "@/core/ui"
import { useAuth, useMyProfessional } from "@/shared/hooks"
import { formatDate } from "@/shared/utils"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQueryMedicalRecordByPatient } from "../api/queries"
import { RecordTimeline } from "../components/record-timeline"
import { ClinicalProfileCard } from "../components/clinical-profile-card"

export function MedicalRecordPage() {
  const { patientId } = useParams()
  const { hasPermission } = useAuth()
  const { timeline, loadingTimeline } = useQueryMedicalRecordByPatient(patientId)
  const { professionalId, isProfessional, isLoading: loadingProfessional } = useMyProfessional()
  const navigate = useNavigate()

  // Prontuários são de quem atende: ADMIN sem perfil de profissional não acessa.
  if (!hasPermission("RECORD_VIEW") || (!loadingProfessional && !isProfessional)) {
    return <Navigate to="/error-403" />
  }

  const canWrite = hasPermission("RECORD_WRITE")
  const patient = timeline?.patient

  return (
    <>
      <BaseLayout.Root title={patient?.name ?? "Prontuário"} pageTitle="Atendimento">
        <BaseLayout.Header isFilters={false}>
          <Link to="/medical-record" className="btn btn-light">
            Voltar
          </Link>
          {canWrite && (
            <ButtonPrimitive
              variant="primary"
              disabled={!patient}
              onClick={() => navigate(`/medical-record/${patientId}/new`)}
            >
              Nova ficha
            </ButtonPrimitive>
          )}
        </BaseLayout.Header>
        <BaseLayout.Body>
          <>
            <InfoRules
              rules={[
                "Os dados básicos (altura, peso, diabetes, alergias) ficam no topo e guardam só o valor atual; cada leitura e alteração é auditada.",
                "Você vê todas as fichas deste paciente nesta clínica, da mais recente para a mais antiga. Cada ficha começa fechada: clique para ver o texto, a prescrição, os exames, os atestados e os encaminhamentos (e imprimir).",
                <>
                  A ficha só pode ser criada para uma consulta <strong>confirmada</strong> ou com o
                  paciente <strong>presente</strong>, e cada consulta tem uma ficha ativa.
                </>,
                "Fichas não podem ser editadas nem apagadas. Para corrigir, cancele a ficha com uma justificativa e crie outra (só o autor cancela).",
                "Só o autor cancela uma ficha, e precisa informar uma justificativa. A ficha cancelada continua visível, riscada, e libera a consulta para uma nova ficha.",
                "Abrir este prontuário e criar ou cancelar fichas ficam registrados na auditoria.",
              ]}
            />
            {patientId && <ClinicalProfileCard patientId={patientId} canEdit={canWrite} />}
            {patient && (
              <p className="text-muted">
                Nascimento: {formatDate(String(patient.birthDate).slice(0, 10))}
                {!patient.active && " · Paciente inativo"}
              </p>
            )}
            <RecordTimeline
              timeline={timeline}
              canWrite={canWrite}
              professionalId={professionalId}
            />
          </>
        </BaseLayout.Body>
      </BaseLayout.Root>
    </>
  )
}

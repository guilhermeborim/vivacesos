import { BaseLayout, ButtonPrimitive, InfoRules, Loading } from "@/core/ui"
import { useAuth, useMyProfessional } from "@/shared/hooks"
import { MedicalRecordEntry } from "@/shared/types"
import { formatDate } from "@/shared/utils"
import { useMemo, useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQueryMedicalRecordByPatient } from "../api/queries"
import { CancelEntryModal } from "../components/cancel-entry-modal"
import { EntryCard } from "../components/entry-card"
import { ClinicalProfileCard } from "../components/clinical-profile-card"

export function MedicalRecordPage() {
  const { patientId } = useParams()
  const { hasPermission } = useAuth()
  const { timeline, loadingTimeline } = useQueryMedicalRecordByPatient(patientId)
  const { professionalId, isProfessional, isLoading: loadingProfessional } = useMyProfessional()
  const navigate = useNavigate()
  const [canceling, setCanceling] = useState<MedicalRecordEntry | null>(null)

  // Fichas originais (mais novas primeiro), cada uma com seus adendos (mais antigos primeiro).
  const groups = useMemo(() => {
    const entries = timeline?.entries ?? []
    return entries
      .filter((e) => !e.parentEntryId)
      .map((root) => ({
        root,
        addenda: entries
          .filter((e) => e.parentEntryId === root.entryId)
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
      }))
  }, [timeline])

  // Prontuários são de quem atende: ADMIN sem perfil de profissional não acessa.
  if (!hasPermission("RECORD_VIEW") || (!loadingProfessional && !isProfessional)) {
    return <Navigate to="/error-403" />
  }

  const canWrite = hasPermission("RECORD_WRITE")
  const patient = timeline?.patient

  return (
    <>
      <BaseLayout.Root title={patient?.name ?? "Prontuário"} pageTitle="Prontuários">
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
                "Você vê todas as fichas deste paciente nesta clínica, da mais recente para a mais antiga; os adendos ficam logo abaixo da ficha original.",
                <>
                  A ficha só pode ser criada para uma consulta <strong>confirmada</strong>, e cada
                  consulta tem uma ficha ativa.
                </>,
                "Fichas não podem ser editadas nem apagadas. Para complementar, use o adendo (só em ficha ativa, e não em outro adendo).",
                "Só o autor cancela uma ficha, e precisa informar uma justificativa. A ficha cancelada continua visível, riscada, e libera a consulta para uma nova ficha.",
                "Abrir este prontuário e criar ou cancelar fichas ficam registrados na auditoria.",
              ]}
            />
            {loadingTimeline && <Loading loading />}
            {patientId && <ClinicalProfileCard patientId={patientId} canEdit={canWrite} />}
            {patient && (
              <p className="text-muted">
                Nascimento: {formatDate(String(patient.birthDate).slice(0, 10))}
                {!patient.active && " · Paciente inativo"}
              </p>
            )}
            {timeline && groups.length === 0 && (
              <p className="text-muted">Nenhuma ficha registrada neste prontuário.</p>
            )}
            {groups.map(({ root, addenda }) => (
              <div key={root.entryId}>
                <EntryCard
                  entry={root}
                  canWrite={canWrite}
                  isMine={root.professional.professionalId === professionalId}
                  onAddendum={(entry) =>
                    navigate(`/medical-record/${patientId}/new?parentEntryId=${entry.entryId}`)
                  }
                  onCancel={setCanceling}
                />
                {addenda.map((a) => (
                  <EntryCard
                    key={a.entryId}
                    entry={a}
                    isAddendum
                    canWrite={canWrite}
                    isMine={a.professional.professionalId === professionalId}
                    onCancel={setCanceling}
                  />
                ))}
              </div>
            ))}
          </>
        </BaseLayout.Body>
      </BaseLayout.Root>

      {patient && canceling && (
        <CancelEntryModal
          patientId={patient.patientId}
          entryId={canceling.entryId}
          toggle={() => setCanceling(null)}
        />
      )}
    </>
  )
}

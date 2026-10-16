import { BaseLayout, ButtonPrimitive, InfoRules, ModalComponent } from "@/core/ui"
import { useAuth } from "@/shared/hooks"
import { formatDateTime } from "@/shared/utils"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Alert, Badge, Card, CardBody } from "reactstrap"
import {
  useMutationGoogleCalendar,
  useMutationGoogleConnect,
  useMutationGoogleDisconnect,
  useMutationGoogleSyncAll,
} from "../api/mutations"
import { useQueryGoogleProfessionals, useQueryGoogleStatus } from "../api/queries"

/** Google Agenda da clínica: uma agenda por profissional, criada pelo sistema. */
export function GooglePage() {
  const { hasPermission } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { google } = useQueryGoogleStatus()
  const connected = google?.status === "CONNECTED"
  const { googleProfessionals } = useQueryGoogleProfessionals(connected)
  const connect = useMutationGoogleConnect()
  const disconnect = useMutationGoogleDisconnect()
  const syncAll = useMutationGoogleSyncAll()
  const createCalendar = useMutationGoogleCalendar()
  const [confirmDisconnect, setConfirmDisconnect] = useState(false)

  // Retorno do Google (?connected=1 ou ?error=...): avisa e limpa a URL.
  useEffect(() => {
    if (params.get("connected")) toast.success("Google Agenda conectado!")
    if (params.get("error")) {
      toast.error(
        params.get("error") === "denied"
          ? "A autorização do Google foi cancelada."
          : "Não foi possível concluir a conexão com o Google. Tente de novo.",
      )
    }
    if (params.toString()) navigate("/google", { replace: true })
  }, [params, navigate])

  if (!hasPermission("INTEGRATIONS_MANAGE")) return <Navigate to="/error-403" replace />

  return (
    <>
      <BaseLayout.Root title="Google Agenda" pageTitle="Integrações">
        <BaseLayout.Header isFilters={false} />
        <BaseLayout.Body>
          <>
            <InfoRules
              rules={[
                "Conecte o Google da clínica uma vez. O sistema cria sozinho uma agenda por profissional (“Vivace — Nome”) e envia as consultas para ela.",
                "A sincronização é de mão única: o que muda no sistema (novo agendamento, reagendamento, cancelamento, falta) atualiza o Google. Alterações feitas direto no Google não voltam para o sistema.",
                "O evento mostra só o nome do paciente, o profissional, a clínica e a situação; nunca dados clínicos.",
                "O sistema só enxerga as agendas que ele mesmo criou, não as suas agendas pessoais.",
                "Para o profissional ver a própria agenda, compartilhe-a no Google Agenda (Configurações da agenda → Compartilhar com pessoas específicas).",
                "Se o Google recusar o acesso (senha trocada, acesso removido), a integração desconecta e os administradores são avisados pelo sino.",
              ]}
            />

            {google && !google.configured && (
              <Alert color="warning">
                As credenciais do Google ainda não foram configuradas no servidor (variáveis
                <code> GOOGLE_CLIENT_ID</code>, <code>GOOGLE_CLIENT_SECRET</code> e{" "}
                <code>GOOGLE_REDIRECT_URI</code>). Peça a quem administra o sistema.
              </Alert>
            )}

            <Card className="border mb-3">
              <CardBody>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h6 className="mb-0">Conexão</h6>
                  <Badge color={connected ? "success" : "secondary"}>
                    {connected ? "CONECTADO" : "NÃO CONECTADO"}
                  </Badge>
                </div>
                {connected ? (
                  <>
                    <p className="text-muted mb-2">
                      Conta: <strong>{google?.accountEmail ?? "-"}</strong>
                      {google?.connectedAt && ` · desde ${formatDateTime(google.connectedAt)}`}
                    </p>
                    {google && google.pendingSync > 0 && (
                      <p className="text-warning mb-2">
                        {google.pendingSync} consulta(s) aguardando envio; o sistema tenta de novo a
                        cada 10 minutos.
                      </p>
                    )}
                    <div className="d-flex flex-wrap gap-2">
                      <ButtonPrimitive
                        variant="info"
                        isLoading={syncAll.isPending}
                        onClick={() => syncAll.mutate()}
                      >
                        Enviar consultas futuras ao Google
                      </ButtonPrimitive>
                      <ButtonPrimitive
                        variant="danger"
                        outline
                        onClick={() => setConfirmDisconnect(true)}
                      >
                        Desconectar
                      </ButtonPrimitive>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-muted">
                      Ao conectar, o Google pede sua autorização para o sistema criar as agendas e
                      os eventos. Use a conta Google da clínica.
                    </p>
                    <ButtonPrimitive
                      variant="primary"
                      disabled={!google?.configured}
                      isLoading={connect.isPending}
                      onClick={() => connect.mutate()}
                    >
                      <i className="mdi mdi-google align-bottom me-1" />
                      Conectar com o Google
                    </ButtonPrimitive>
                  </>
                )}
              </CardBody>
            </Card>

            {connected && (
              <Card className="border">
                <CardBody>
                  <h6 className="mb-2">Agendas dos profissionais</h6>
                  <p className="text-muted fs-13">
                    A agenda é criada automaticamente na primeira consulta de cada profissional; use
                    “Criar agenda” para criá-la antes.
                  </p>
                  <div className="table-responsive">
                    <table className="table table-sm align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Profissional</th>
                          <th>Agenda no Google</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {googleProfessionals.map((p) => (
                          <tr key={p.professionalId}>
                            <td>
                              {p.name ?? "-"} {!p.active && <Badge color="danger">INATIVO</Badge>}
                            </td>
                            <td>
                              {p.hasCalendar ? (
                                <Badge color="success">Vivace — {p.name}</Badge>
                              ) : (
                                <Badge color="secondary">Ainda não criada</Badge>
                              )}
                            </td>
                            <td className="text-end">
                              {!p.hasCalendar && (
                                <ButtonPrimitive
                                  size="sm"
                                  variant="light"
                                  disabled={createCalendar.isPending}
                                  onClick={() => createCalendar.mutate(p.professionalId)}
                                >
                                  Criar agenda
                                </ButtonPrimitive>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            )}
          </>
        </BaseLayout.Body>
      </BaseLayout.Root>

      {confirmDisconnect && (
        <ModalComponent.Root isOpen toggle={() => setConfirmDisconnect(false)}>
          <ModalComponent.Body>
            <h5>Desconectar o Google Agenda?</h5>
            <p>
              O acesso do sistema será revogado no Google. As agendas e os eventos já criados
              continuam lá, mas deixam de ser atualizados.
            </p>
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <ButtonPrimitive variant="light" onClick={() => setConfirmDisconnect(false)}>
              Voltar
            </ButtonPrimitive>
            <ButtonPrimitive
              variant="danger"
              isLoading={disconnect.isPending}
              onClick={async () => {
                try {
                  await disconnect.mutateAsync()
                  setConfirmDisconnect(false)
                } catch {
                  // Erro já tratado na mutation
                }
              }}
            >
              Desconectar
            </ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )}
    </>
  )
}

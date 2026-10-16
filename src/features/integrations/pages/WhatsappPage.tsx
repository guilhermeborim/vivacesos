import { BaseLayout, InfoRules } from "@/core/ui"
import { useAuth } from "@/shared/hooks"
import { Navigate } from "react-router-dom"
import { Badge, Card, CardBody } from "reactstrap"
import { useQueryIntegrations } from "../api/queries"

/** Estado do WhatsApp da clínica: envio manual ativo; automático (Z-API) ainda não disponível. */
export function WhatsappPage() {
  const { hasPermission } = useAuth()
  const { integrations } = useQueryIntegrations()

  if (!hasPermission("INTEGRATIONS_MANAGE")) return <Navigate to="/error-403" replace />

  const automatic = integrations?.whatsapp.automaticSending ?? false

  return (
    <BaseLayout.Root title="WhatsApp" pageTitle="Integrações">
      <BaseLayout.Header isFilters={false} />
      <BaseLayout.Body>
        <>
          <InfoRules
            rules={[
              "Hoje as mensagens ao paciente são enviadas por você: em Consultas, a ação “Enviar no WhatsApp” abre o WhatsApp com o texto pronto e o link de confirmação.",
              "O paciente abre o link e confirma ou cancela sem precisar de login; o status da consulta muda sozinho e o sistema avisa a equipe pelo sino.",
              "O link vale até o início da consulta e deixa de valer se ela for reagendada.",
              "O envio automático (sem ninguém clicar) será ligado depois, pela Z-API. Essa estrutura já está pronta no sistema.",
            ]}
          />

          <Card className="border mb-3">
            <CardBody>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <h6 className="mb-0">Envio manual</h6>
                <Badge color="success">ATIVO</Badge>
              </div>
              <p className="text-muted mb-0">
                Disponível para a equipe de recepção. Não tem custo e usa o WhatsApp que a pessoa já
                tem aberto.
              </p>
            </CardBody>
          </Card>

          <Card className="border">
            <CardBody>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <h6 className="mb-0">Envio automático (Z-API)</h6>
                <Badge color={automatic ? "success" : "secondary"}>
                  {automatic ? "CONECTADO" : "EM BREVE"}
                </Badge>
              </div>
              <p className="text-muted">
                Envia a mensagem sozinho ao agendar, a partir do número do WhatsApp da clínica,
                conectado por QR Code.
              </p>
              <ul className="text-muted fs-13 mb-0 ps-3">
                <li>É um serviço pago da Z-API e usa uma sessão do WhatsApp Web.</li>
                <li>
                  Por não ser a API oficial da Meta, há risco de restrição do número em caso de uso
                  fora das regras do WhatsApp; use apenas com pacientes da clínica.
                </li>
                <li>
                  A confirmação e o cancelamento continuam por link, que funciona mesmo se os botões
                  do WhatsApp mudarem.
                </li>
              </ul>
            </CardBody>
          </Card>
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

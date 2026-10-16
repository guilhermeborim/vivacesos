import { Loading } from "@/core/ui"
import { Card, CardBody, Input, Label } from "reactstrap"
import { useMutationSettings } from "../api/mutations"
import { useQuerySettings } from "../api/queries"

/** Opção da clínica: só aparece para quem tem permissão de gerenciar configurações (ADMIN). */
export function RecurringExpensesSection() {
  const { settings, loadingSettings } = useQuerySettings()
  const mutation = useMutationSettings()
  const enabled = settings?.recurringExpensesEnabled ?? false

  return (
    <Card className="border">
      {loadingSettings && <Loading loading />}
      <CardBody>
        <div className="d-flex align-items-start justify-content-between gap-3">
          <div>
            <h6 className="mb-1">Despesas recorrentes</h6>
            <p className="text-muted mb-2">
              {enabled
                ? "Ligado: o cadastro de despesa mostra os campos de recorrência."
                : "Desligado: nenhuma despesa é criada automaticamente."}
            </p>
            <ul className="text-muted fs-13 ps-3 mb-0">
              <li>
                Despesas que se repetem (aluguel, água, luz…) podem ser diárias, semanais,
                quinzenais ou mensais, com data final opcional.
              </li>
              <li>
                No dia de cada vencimento o sistema cria uma nova despesa pendente, com os mesmos
                dados, e avisa os administradores.
              </li>
              <li>Na mensal, o dia original é mantido e ajustado ao fim do mês (31/01 → 28/02).</li>
              <li>
                Desligar pausa a criação; ao religar, o período desligado não gera despesas
                atrasadas.
              </li>
              <li>Para parar uma série, use “Encerrar recorrência” em Despesas.</li>
            </ul>
          </div>
          <div className="form-check form-switch form-switch-lg">
            <Input
              id="recurring-switch"
              type="switch"
              role="switch"
              checked={enabled}
              disabled={loadingSettings || mutation.isPending}
              onChange={(e) => mutation.mutate({ recurringExpensesEnabled: e.target.checked })}
            />
            <Label className="visually-hidden" htmlFor="recurring-switch">
              Usar despesas recorrentes
            </Label>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

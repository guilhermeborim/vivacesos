import { BaseLayout, TableList } from "@/core/ui"
import { useAuth } from "@/shared/hooks"
import { RecordAuditAction, RecordAuditItem } from "@/shared/types"
import { formatDateTime } from "@/shared/utils"
import { useMemo, useState } from "react"
import { Navigate } from "react-router-dom"
import { Badge, Col, Input, Label, Row } from "reactstrap"
import { useQueryRecordAudit } from "../api/queries"

const LIMIT = 500

const actionLabel: Record<RecordAuditAction, { label: string; color: string }> = {
  VIEW_RECORD: { label: "Leu o prontuário", color: "info" },
  CREATE_ENTRY: { label: "Criou ficha", color: "success" },
  CANCEL_ENTRY: { label: "Cancelou ficha", color: "danger" },
  VIEW_AUDIT: { label: "Consultou a auditoria", color: "secondary" },
  VIEW_PROFILE: { label: "Leu os dados básicos", color: "info" },
  UPDATE_PROFILE: { label: "Alterou os dados básicos", color: "primary" },
  VIEW_TRIAGE: { label: "Leu a triagem", color: "info" },
  SAVE_TRIAGE: { label: "Registrou a triagem", color: "primary" },
}

const roleLabel: Record<string, string> = {
  ADMIN: "Admin",
  PROFISSIONAL: "Profissional",
  RECEPCIONISTA: "Recepcionista",
}

const columns = TableList.Columns<RecordAuditItem>({
  columns: [
    TableList.Column<RecordAuditItem>({
      header: "Data/hora",
      accessorFn: (row) => formatDateTime(row.createdAt),
    }),
    TableList.Column<RecordAuditItem>({
      header: "Usuário",
      accessorFn: (row) => row.user.name,
      filterType: "text",
    }),
    TableList.Column<RecordAuditItem>({
      header: "Papel",
      accessorFn: (row) => roleLabel[row.role] ?? row.role,
    }),
    TableList.Column<RecordAuditItem>({
      header: "Ação",
      accessorFn: (row) => actionLabel[row.action].label,
      cell: (row) => (
        <Badge color={actionLabel[row.action].color}>{actionLabel[row.action].label}</Badge>
      ),
      filterType: "select",
      options: Object.values(actionLabel).map((a) => a.label),
    }),
    TableList.Column<RecordAuditItem>({
      header: "Paciente",
      accessorFn: (row) => row.patient?.name ?? "-",
      filterType: "text",
    }),
  ],
})

export function RecordAuditPage() {
  const { hasPermission } = useAuth()
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [action, setAction] = useState("")

  const params = useMemo(
    () => ({
      limit: LIMIT,
      action: action || undefined,
      from: from ? new Date(`${from}T00:00:00`).toISOString() : undefined,
      to: to ? new Date(`${to}T23:59:59`).toISOString() : undefined,
    }),
    [from, to, action],
  )
  const { audit } = useQueryRecordAudit(params)

  if (!hasPermission("AUDIT_VIEW")) return <Navigate to="/error-403" />

  return (
    <BaseLayout.Root title="Auditoria" pageTitle="Administração">
      <BaseLayout.Header isFilters={false} />
      <BaseLayout.Body>
        <>
          <Row className="g-3 pb-3">
            <Col md={3}>
              <Label className="form-label">De</Label>
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </Col>
            <Col md={3}>
              <Label className="form-label">Até</Label>
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </Col>
            <Col md={3}>
              <Label className="form-label">Ação</Label>
              <Input type="select" value={action} onChange={(e) => setAction(e.target.value)}>
                <option value="">Todas</option>
                {Object.entries(actionLabel).map(([value, { label }]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
          {audit && audit.total > LIMIT && (
            <p className="text-muted">
              Mostrando os {LIMIT} registros mais recentes de {audit.total}. Use os filtros de data.
            </p>
          )}
          <TableList.Root columns={columns} data={audit?.items || []} />
        </>
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}

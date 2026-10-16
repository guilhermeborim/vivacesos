import { ReactNode, useState } from "react"
import { Button, Card, CardBody } from "reactstrap"
import "./charts.css"

export interface ChartTable {
  columns: string[]
  rows: (string | number)[][]
}

interface ChartCardProps {
  title: string
  subtitle?: string
  /** Gêmea acessível do gráfico: todos os valores em tabela. */
  table: ChartTable
  children: ReactNode
}

/** Cartão de gráfico com alternância gráfico ↔ tabela (os valores nunca dependem do tooltip). */
export function ChartCard({ title, subtitle, table, children }: ChartCardProps) {
  const [showTable, setShowTable] = useState(false)

  return (
    <Card className="border viz-root h-100">
      <CardBody>
        <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
          <div>
            <h6 className="mb-0">{title}</h6>
            {subtitle && <small className="text-muted">{subtitle}</small>}
          </div>
          <Button
            color="light"
            size="sm"
            onClick={() => setShowTable(!showTable)}
            aria-pressed={showTable}
          >
            <i className={showTable ? "ri-bar-chart-2-line" : "ri-table-line"} />{" "}
            {showTable ? "Gráfico" : "Tabela"}
          </Button>
        </div>

        {showTable ? (
          <div className="table-responsive">
            <table className="table table-sm align-middle mb-0">
              <thead>
                <tr>
                  {table.columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          children
        )}
      </CardBody>
    </Card>
  )
}

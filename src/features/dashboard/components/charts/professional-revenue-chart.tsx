import { DashboardAnalytics } from "@/shared/types"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartCard } from "./chart-card"
import { ChartTooltip } from "./chart-tooltip"
import { currency } from "./format"

const MAX_BARS = 8

export function ProfessionalRevenueChart({ data }: { data: DashboardAnalytics["byProfessional"] }) {
  const bars = data.slice(0, MAX_BARS).map((p) => ({
    name: p.name ?? "Sem nome",
    received: p.received,
  }))

  return (
    <ChartCard
      title="Receita por profissional"
      subtitle={
        data.length > MAX_BARS
          ? `Recebido no mês — os ${MAX_BARS} maiores (todos na tabela)`
          : "Recebido no mês"
      }
      table={{
        columns: ["Profissional", "Recebido", "Consultas pagas"],
        rows: data.map((p) => [p.name ?? "Sem nome", currency(p.received), p.count]),
      }}
    >
      {bars.length === 0 ? (
        <p className="text-muted mb-0">Nenhum pagamento recebido no mês.</p>
      ) : (
        <div role="img" aria-label="Gráfico de barras da receita recebida por profissional">
          <ResponsiveContainer width="100%" height={bars.length * 44 + 16}>
            <BarChart
              data={bars}
              layout="vertical"
              margin={{ top: 4, right: 88, left: 0, bottom: 4 }}
            >
              <CartesianGrid horizontal={false} stroke="var(--viz-grid)" />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={{ stroke: "var(--viz-axis)" }}
                width={110}
              />
              <Tooltip
                cursor={{ fill: "var(--viz-grid)", opacity: 0.5 }}
                content={<ChartTooltip format={currency} />}
              />
              <Bar
                dataKey="received"
                name="Recebido"
                fill="var(--viz-s1)"
                barSize={20}
                radius={[0, 4, 4, 0]}
              >
                <LabelList
                  dataKey="received"
                  position="right"
                  formatter={(v: unknown) => currency(Number(v))}
                  style={{ fill: "var(--viz-ink)", fontSize: 12, fontWeight: 600 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  )
}

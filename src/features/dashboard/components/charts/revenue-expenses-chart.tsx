import { DashboardAnalytics } from "@/shared/types"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartCard } from "./chart-card"
import { ChartTooltip } from "./chart-tooltip"
import { currency, formatCompact, monthLong, monthShort } from "./format"

export function RevenueExpensesChart({ series }: { series: DashboardAnalytics["monthlySeries"] }) {
  const data = series.map((s) => ({ ...s, label: monthShort(s.month) }))

  return (
    <ChartCard
      title="Receita × despesas"
      subtitle="Últimos 6 meses, por data de pagamento"
      table={{
        columns: ["Mês", "Receita", "Despesas"],
        rows: series.map((s) => [monthLong(s.month), currency(s.revenue), currency(s.expenses)]),
      }}
    >
      <div className="viz-legend">
        <span className="viz-legend-item">
          <span className="viz-key-box" style={{ background: "var(--viz-s1)" }} /> Receita
        </span>
        <span className="viz-legend-item">
          <span className="viz-key-box" style={{ background: "var(--viz-s2)" }} /> Despesas
        </span>
      </div>
      <div role="img" aria-label="Gráfico de barras de receita e despesas dos últimos 6 meses">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barGap={2} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
            <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: "var(--viz-axis)" }} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={formatCompact} width={44} />
            <Tooltip
              cursor={{ fill: "var(--viz-grid)", opacity: 0.5 }}
              content={
                <ChartTooltip
                  format={currency}
                  title={(label) => {
                    const item = data.find((d) => d.label === label)
                    return item ? monthLong(item.month) : String(label)
                  }}
                />
              }
            />
            <Bar
              dataKey="revenue"
              name="Receita"
              fill="var(--viz-s1)"
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              name="Despesas"
              fill="var(--viz-s2)"
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

import { DashboardAnalytics } from "@/shared/types"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartCard } from "./chart-card"
import { ChartTooltip } from "./chart-tooltip"
import { currency, formatCompact, monthLong } from "./format"

interface CumulativeRevenueChartProps {
  month: string
  cumulative: DashboardAnalytics["cumulativeRevenue"]
}

export function CumulativeRevenueChart({ month, cumulative }: CumulativeRevenueChartProps) {
  const data = cumulative.current.map((c, i) => ({
    day: c.day,
    current: c.total,
    previous: cumulative.previous[i]?.total ?? null,
  }))
  // Último dia com valor: recebe o marcador final (o destaque da linha do mês).
  const lastIndex = data.reduce((acc, d, i) => (d.current !== null ? i : acc), -1)

  return (
    <ChartCard
      title="Receita acumulada no mês"
      subtitle="Dia a dia, contra o mês anterior"
      table={{
        columns: ["Dia", "Este mês", "Mês anterior"],
        rows: data.map((d) => [
          d.day,
          d.current === null ? "—" : currency(d.current),
          d.previous === null ? "—" : currency(d.previous),
        ]),
      }}
    >
      <div className="viz-legend">
        <span className="viz-legend-item">
          <span className="viz-key-line" style={{ background: "var(--viz-s1)" }} />{" "}
          {monthLong(month)}
        </span>
        <span className="viz-legend-item">
          <span className="viz-key-line" style={{ background: "var(--viz-neutral)" }} /> Mês
          anterior
        </span>
      </div>
      <div role="img" aria-label="Gráfico de linhas da receita acumulada no mês e no mês anterior">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: "var(--viz-axis)" }}
              interval="preserveStartEnd"
              minTickGap={24}
            />
            <YAxis tickLine={false} axisLine={false} tickFormatter={formatCompact} width={44} />
            <Tooltip
              cursor={{ stroke: "var(--viz-axis)", strokeWidth: 1 }}
              content={
                <ChartTooltip keyShape="line" format={currency} title={(label) => `Dia ${label}`} />
              }
            />
            <Line
              type="monotone"
              dataKey="previous"
              name="Mês anterior"
              stroke="var(--viz-neutral)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              dot={false}
              activeDot={{
                r: 4,
                fill: "var(--viz-neutral)",
                stroke: "var(--viz-surface)",
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="current"
              name="Este mês"
              stroke="var(--viz-s1)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              connectNulls={false}
              dot={(props: { cx?: number; cy?: number; index?: number }) =>
                props.index === lastIndex && props.cx !== undefined && props.cy !== undefined ? (
                  <circle
                    key="end"
                    cx={props.cx}
                    cy={props.cy}
                    r={5}
                    fill="var(--viz-s1)"
                    stroke="var(--viz-surface)"
                    strokeWidth={2}
                  />
                ) : (
                  <g key={`d-${props.index}`} />
                )
              }
              activeDot={{
                r: 5,
                fill: "var(--viz-s1)",
                stroke: "var(--viz-surface)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

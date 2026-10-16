import { DashboardAnalytics } from "@/shared/types"
import { ChartCard } from "./chart-card"
import { currency, paymentMethodName } from "./format"

// Cor segue a forma de pagamento (identidade), nunca a posição no ranking.
const methodColor: Record<string, string> = {
  PIX: "var(--viz-s1)",
  CARTAO: "var(--viz-s2)",
  DINHEIRO: "var(--viz-s3)",
}

const nameOf = (method: string | null) =>
  method ? (paymentMethodName[method] ?? method) : "Não informado"

export function PaymentMethodsChart({ data }: { data: DashboardAnalytics["byPaymentMethod"] }) {
  const total = data.reduce((sum, d) => sum + d.total, 0)
  const pct = (value: number) =>
    total > 0
      ? `${((value / total) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`
      : "0%"

  return (
    <ChartCard
      title="Formas de pagamento"
      subtitle="Recebido no mês"
      table={{
        columns: ["Forma", "Recebido", "% do total", "Consultas pagas"],
        rows: data.map((d) => [nameOf(d.method), currency(d.total), pct(d.total), d.count]),
      }}
    >
      {total === 0 ? (
        <p className="text-muted mb-0">Nenhum pagamento recebido no mês.</p>
      ) : (
        <>
          <div
            className="d-flex mb-3"
            style={{ gap: 2 }}
            role="img"
            aria-label="Barra empilhada com a divisão do recebido por forma de pagamento"
          >
            {data.map((d, i) => (
              <div
                key={d.method ?? "none"}
                className="viz-segment"
                tabIndex={0}
                title={`${nameOf(d.method)}: ${currency(d.total)} (${pct(d.total)})`}
                style={{
                  flex: d.total,
                  background: methodColor[d.method ?? ""] ?? "var(--viz-neutral)",
                  borderRadius:
                    i === 0 && data.length === 1
                      ? 4
                      : i === 0
                        ? "4px 0 0 4px"
                        : i === data.length - 1
                          ? "0 4px 4px 0"
                          : 0,
                }}
              />
            ))}
          </div>
          <ul className="list-unstyled mb-0">
            {data.map((d) => (
              <li
                key={d.method ?? "none"}
                className="d-flex align-items-center justify-content-between py-1"
              >
                <span className="viz-legend-item" style={{ color: "var(--viz-ink-2)" }}>
                  <span
                    className="viz-key-box"
                    style={{ background: methodColor[d.method ?? ""] ?? "var(--viz-neutral)" }}
                  />
                  {nameOf(d.method)}
                </span>
                <span style={{ color: "var(--viz-ink)" }}>
                  <strong>{currency(d.total)}</strong>{" "}
                  <span style={{ color: "var(--viz-ink-2)" }}>· {pct(d.total)}</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </ChartCard>
  )
}

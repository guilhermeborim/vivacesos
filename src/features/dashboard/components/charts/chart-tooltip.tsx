interface TooltipEntry {
  name?: string | number
  value?: number | string | null
  color?: string
  dataKey?: string | number
}

interface ChartTooltipProps {
  active?: boolean
  label?: string | number
  payload?: readonly TooltipEntry[]
  /** Título do tooltip a partir do rótulo do eixo. */
  title?: (label: string | number) => string
  format: (value: number) => string
  /** "line" para séries de linha, "box" para barras. */
  keyShape?: "line" | "box"
}

/** Tooltip único: valores em destaque, nome da série em segundo plano e chave na cor da série. */
export function ChartTooltip({
  active,
  label,
  payload,
  title,
  format,
  keyShape = "box",
}: ChartTooltipProps) {
  const rows = (payload ?? []).filter((p) => typeof p.value === "number")
  if (!active || rows.length === 0) return null

  return (
    <div className="viz-tooltip" role="status">
      {label !== undefined && (
        <div className="viz-tooltip-title">{title ? title(label) : label}</div>
      )}
      {rows.map((p) => (
        <div className="viz-tooltip-row" key={String(p.dataKey ?? p.name)}>
          <span className="viz-tooltip-key">
            <span
              className={keyShape === "line" ? "viz-key-line" : "viz-key-box"}
              style={{ background: p.color }}
            />
            {p.name}
          </span>
          <span className="viz-tooltip-value">{format(p.value as number)}</span>
        </div>
      ))}
    </div>
  )
}

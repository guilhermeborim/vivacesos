import { formatCurrency, formatDate } from "@/shared/utils"
import { FinanceFilters } from "./schemas"

export interface ReportRow {
  label: string
  /** Número = moeda; texto = exibido como está. */
  value: number | string
}

export interface ReportTable {
  columns: string[]
  rows: string[][]
}

export interface ReportSection {
  title: string
  rows?: ReportRow[]
  table?: ReportTable
  note?: string
}

interface ReportPdfData {
  filters: FinanceFilters
  professionalName?: string
  sections: ReportSection[]
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const renderValue = (value: number | string) =>
  typeof value === "number" ? formatCurrency(value) : escapeHtml(value)

const renderTable = (t: ReportTable) => `
  <table class="grid">
    <thead><tr>${t.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr></thead>
    <tbody>${t.rows
      .map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`)
      .join("")}</tbody>
  </table>`

/** Abre o diálogo de impressão do navegador com o relatório (escolha "Salvar como PDF"). */
export function printReportPdf({ filters, professionalName, sections }: ReportPdfData) {
  const period = `${filters.from ? formatDate(filters.from) : "-"} a ${filters.to ? formatDate(filters.to) : "-"}`
  const dateField =
    filters.dateField === "paidAt" ? "Data do pagamento" : "Data da consulta / vencimento"

  const body = sections
    .map(
      (s) => `
      <h2>${escapeHtml(s.title)}</h2>
      ${s.note ? `<p class="note">${escapeHtml(s.note)}</p>` : ""}
      ${
        s.rows
          ? `<table>${s.rows
              .map(
                (r) =>
                  `<tr><td>${escapeHtml(r.label)}</td><td class="value ${typeof r.value === "number" && r.value < 0 ? "neg" : ""}">${renderValue(r.value)}</td></tr>`,
              )
              .join("")}</table>`
          : ""
      }
      ${s.table ? renderTable(s.table) : ""}`,
    )
    .join("")

  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8" /><title>Relatório financeiro</title>
<style>
  body { font-family: Arial, sans-serif; color: #212529; margin: 32px; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  h2 { font-size: 15px; margin: 24px 0 8px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
  .meta { font-size: 12px; color: #6c757d; margin: 0 0 2px; }
  .note { font-size: 12px; color: #6c757d; margin: 0 0 8px; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  td { padding: 6px 4px; border-bottom: 1px solid #eee; }
  .value { text-align: right; font-weight: bold; }
  .neg { color: #dc3545; }
  table.grid { font-size: 12px; }
  table.grid th { text-align: left; padding: 6px 4px; border-bottom: 2px solid #ccc; }
  h2, table { page-break-inside: avoid; }
</style></head><body>
  <h1>Relatório financeiro</h1>
  <p class="meta">Período: ${period} (${dateField})</p>
  ${professionalName ? `<p class="meta">Profissional: ${escapeHtml(professionalName)}</p>` : ""}
  <p class="meta">Gerado em ${new Date().toLocaleString("pt-BR")}</p>
  ${body}
</body></html>`

  const iframe = document.createElement("iframe")
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0"
  document.body.appendChild(iframe)
  const doc = iframe.contentDocument
  if (!doc || !iframe.contentWindow) {
    iframe.remove()
    return
  }
  doc.open()
  doc.write(html)
  doc.close()
  iframe.contentWindow.onafterprint = () => iframe.remove()
  iframe.contentWindow.focus()
  iframe.contentWindow.print()
}

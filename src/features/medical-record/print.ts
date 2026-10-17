import { Certificate, ExamRequest, Prescription, Referral } from "@/shared/types"
import { escapeHtml, printHtml } from "@/shared/utils/print-html"
import { describeCertificate, describePrescription } from "./utils-items"

/** Quem emite e para quem: sai no cabeçalho e na assinatura de cada documento. */
export interface PrintContext {
  clinicName: string
  /** Endereço (e telefone) da clínica, numa linha. */
  clinicAddress?: string
  patientName: string
  professionalName: string
  crm?: string | null
  specialty?: string | null
  /** Data do documento (ISO); padrão: agora. */
  date?: string
}

const multiline = (text: string) => escapeHtml(text).replace(/\n/g, "<br />")

function printDocument(title: string, ctx: PrintContext, body: string) {
  const when = new Date(ctx.date ?? Date.now()).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
  const credentials = [
    ctx.crm ? `CRM ${escapeHtml(ctx.crm)}` : null,
    ctx.specialty ? escapeHtml(ctx.specialty) : null,
  ]
    .filter(Boolean)
    .join(" · ")

  printHtml(`<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8" /><title>${escapeHtml(title)}</title>
<style>
  body { font-family: Arial, sans-serif; color: #212529; margin: 40px 48px; font-size: 14px; line-height: 1.5; }
  header { border-bottom: 2px solid #212529; padding-bottom: 8px; margin-bottom: 24px; }
  header h1 { font-size: 18px; margin: 0; }
  header p { margin: 2px 0 0; font-size: 12px; color: #6c757d; }
  h2 { font-size: 20px; text-align: center; letter-spacing: 2px; margin: 0 0 24px; }
  .patient { margin-bottom: 20px; }
  ol, ul { padding-left: 20px; }
  li { margin-bottom: 12px; }
  .sub { display: block; font-size: 12px; color: #495057; }
  .text { margin: 0 0 16px; }
  .signature { margin-top: 96px; text-align: center; }
  .signature .line { width: 320px; border-top: 1px solid #212529; margin: 0 auto 4px; }
  .signature p { margin: 0; font-size: 12px; }
  .date { margin-top: 32px; text-align: right; font-size: 12px; }
  .page { page-break-after: always; }
  .page:last-child { page-break-after: auto; }
</style></head><body>${body
    .split("<!--page-->")
    .map(
      (page) => `<section class="page">
  <header><h1>${escapeHtml(ctx.clinicName)}</h1>${
    ctx.clinicAddress ? `<p>${escapeHtml(ctx.clinicAddress)}</p>` : ""
  }</header>
  <h2>${escapeHtml(title.toUpperCase())}</h2>
  <p class="patient"><strong>Paciente:</strong> ${escapeHtml(ctx.patientName)}</p>
  ${page}
  <p class="date">${escapeHtml(when)}</p>
  <div class="signature">
    <div class="line"></div>
    <p><strong>${escapeHtml(ctx.professionalName)}</strong></p>
    ${credentials ? `<p>${credentials}</p>` : ""}
  </div>
</section>`,
    )
    .join("")}</body></html>`)
}

export function printPrescriptions(ctx: PrintContext, items: Prescription[]) {
  const list = items
    .map(
      (p) =>
        `<li>${escapeHtml(describePrescription(p))}${
          p.instructions ? `<span class="sub">${multiline(p.instructions)}</span>` : ""
        }</li>`,
    )
    .join("")
  printDocument("Receituário", ctx, `<ol>${list}</ol>`)
}

export function printExams(ctx: PrintContext, items: ExamRequest[]) {
  const list = items
    .map(
      (x) =>
        `<li>${escapeHtml(x.name)}${x.notes ? `<span class="sub">${multiline(x.notes)}</span>` : ""}</li>`,
    )
    .join("")
  printDocument("Solicitação de exames", ctx, `<ol>${list}</ol>`)
}

/** Um atestado por página. */
export function printCertificates(ctx: PrintContext, items: Certificate[]) {
  const pages = items
    .map(
      (c) =>
        `<p class="text"><strong>${escapeHtml(describeCertificate(c))}</strong>${c.cid ? ` &nbsp;·&nbsp; <strong>CID:</strong> ${escapeHtml(c.cid)}` : ""}</p><p class="text">${multiline(c.text)}</p>`,
    )
    .join("<!--page-->")
  printDocument("Atestado", ctx, pages)
}

/** Um encaminhamento por página. */
export function printReferrals(ctx: PrintContext, items: Referral[]) {
  const pages = items
    .map(
      (r) =>
        `<p class="text"><strong>Encaminho o paciente para:</strong> ${escapeHtml(r.specialty)}</p>${
          r.reason ? `<p class="text">${multiline(r.reason)}</p>` : ""
        }`,
    )
    .join("<!--page-->")
  printDocument("Encaminhamento", ctx, pages)
}

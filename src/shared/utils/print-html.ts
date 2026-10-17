export const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/** Abre o diálogo de impressão do navegador com o HTML (escolha "Salvar como PDF" para gerar arquivo). */
export function printHtml(html: string) {
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

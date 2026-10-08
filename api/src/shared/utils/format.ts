export const replacePayloadString = (payload: string): string => {
  if (!payload) return ""

  return payload.replace(/\D/g, "")
}

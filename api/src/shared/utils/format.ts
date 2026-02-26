export const replacePayloadString = (payload: string) => {
  if (!payload) return

  return payload.replace(/\D/g, "")
}

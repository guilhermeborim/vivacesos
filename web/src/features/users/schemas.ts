import z from "zod";

export const registerInviteBodySchema = z.object({
  email: z.email({ error: "Campo obrigatório!" }),
  role: z.enum(["ADMIN", "PROFISSIONAL", "RECEPCIONISTA"], {
    error: "Selecione uma opção!",
  }),
});

export type RegisterInviteBodySchema = z.infer<typeof registerInviteBodySchema>;

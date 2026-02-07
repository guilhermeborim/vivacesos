import z from "zod";

export const createInviteSchema = z.object({
  email: z.email({ error: "Campo obrigatório!" }),
  role: z.enum(["ADMIN", "PROFISSIONAL", "RECEPCIONISTA"], {
    error: "Selecione uma opção!",
  }),
});

export type CreateInviteTypeSchema = z.infer<typeof createInviteSchema>;

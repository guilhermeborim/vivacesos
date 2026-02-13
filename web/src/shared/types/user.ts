enum Role {
  ADMIN = "ADMIN",
  PROFISSIONAL = "PROFESSIONAL",
  RECEPCIONISTA = "RECEPCIONISTA",
}

export type User = {
  id: string;
  role: Role;
  status: string;
  id_user: string;
  name: string;
  email: string;
};

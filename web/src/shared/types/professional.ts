enum Type {
  MEDICO = "MEDICO",
}

export type Professional = {
  id: string;
  userId: string;
  clinicId: string;
  type: Type;
  crm: string;
  specialty: string;
  active: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  name: string;
  email: string;
};

export type Patient = {
  id: string;
  clinicId: string;
  name: string;
  email: string;
  cpf: string;
  phone: boolean;
  birth_date: string | Date;
  active: boolean;
};

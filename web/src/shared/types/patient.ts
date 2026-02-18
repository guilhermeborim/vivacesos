export type Patient = {
  id: string;
  clinicId: string;
  name: string;
  email: string;
  cpf: string;
  phone: boolean;
  birthDate: string | Date;
  active: boolean;
};

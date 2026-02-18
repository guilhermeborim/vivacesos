export type CreatePatientParams = {
  name: string;
  email: string;
  cpf: string;
  cpfHash?: string | null;
  phoneHash?: string | null;
  phone: string;
  birthDate: Date | string;
  active?: boolean;
};

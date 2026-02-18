export interface CreatePatientParams {
  name: string;
  email: string;
  cpf: string;
  cpfHash?: string | null;
  phoneHash?: string | null;
  phone: string;
  birthDate: Date | string;
  active?: boolean;
}

// export interface ProfessionalResponse {
//   professional: Professional;
// }

// export interface ProfessionalsResponse {
//   professionals: Professional[];
// }

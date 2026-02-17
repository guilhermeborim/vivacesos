export interface CreatePatientParams {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birth_date: Date;
  active?: boolean;
}

// export interface ProfessionalResponse {
//   professional: Professional;
// }

// export interface ProfessionalsResponse {
//   professionals: Professional[];
// }

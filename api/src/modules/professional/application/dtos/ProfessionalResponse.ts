import { ProfessionalType } from "../../../../infra/database/typeorm/sass/entities/Professional";

export interface ProfessionalResponse {
  id: string;
  userId: string;
  clinicId: string;
  type: ProfessionalType;
  crm: string;
  specialty: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

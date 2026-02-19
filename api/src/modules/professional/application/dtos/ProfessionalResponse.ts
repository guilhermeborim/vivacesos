import { ProfessionalType } from "../../../../infra/database/typeorm/sass/entities/Professional";

export type ProfessionalResponse = {
  id: string;
  userId: string;
  clinicId: string;
  type: ProfessionalType;
  crm: string;
  specialty: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type GetProfessionalsByClinicResponse = {
  userId: string;
  clinicId: string;
  professional: {
    type: ProfessionalType;
    name: string;
    specialty: string;
  };
};

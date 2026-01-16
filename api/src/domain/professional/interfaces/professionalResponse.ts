import { Professional } from "../../../infra/database/typeorm/sass/entities/Professional";

export interface ProfessionalResponse {
  professional: Professional;
}

export interface ProfessionalsResponse {
  professionals: Professional[];
}

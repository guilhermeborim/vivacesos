import { Type } from "../enums";

export type Professional = {
  clinicId: string;
  userId: string;
  professional: {
    name: string;
    specialty: string;
    type: Type;
  };
};

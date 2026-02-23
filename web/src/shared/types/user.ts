import { Role } from "../enums";

export type User = {
  id: string;
  role: Role;
  status: string;
  user: {
    userId: string;
    name: string;
    email: string;
  };
};

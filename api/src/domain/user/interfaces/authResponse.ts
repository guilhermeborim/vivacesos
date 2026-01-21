import { User } from "../../../infra/database/typeorm/sass/entities/User";

export interface AuthReponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterResponse {
  user: User;
}

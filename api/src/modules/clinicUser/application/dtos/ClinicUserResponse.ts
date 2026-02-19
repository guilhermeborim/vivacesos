import {
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";

// export type ClinicResponse = {
//   userId: string;
//   clinicId: string;
//   clinic: {
//     name: string;
//     city: string;
//   };
// }

export type BindClinicUserResponse = {
  token?: string;
  clinicId: string;
  role: ClinicUserRole;
  status: ClinicUserStatus;
  userId: string;
};

export type ClinicUserResponse = {
  userId: string;
  clinicId: string;
  role: ClinicUserRole;
  status: ClinicUserStatus;
  token?: string;
  clinic?: {
    name?: string;
  };
  user?: {
    name?: string;
    email?: string;
  };
};

export type GetUsersByClinicResponse = {
  id: string;
  role: ClinicUserRole;
  status: ClinicUserStatus;
  user: {
    userId: string;
    name: string;
    email: string;
  };
};

export type GetClinicsByUserResponse = {
  id: string;
  role: ClinicUserRole;
  status: ClinicUserStatus;
  clinic: {
    name: string;
    clinicId: string;
    city: string;
  };
};

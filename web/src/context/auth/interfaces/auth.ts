export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  clinics: [
    {
      clinic_id: string;
      name: string;
    },
  ];
}

export interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

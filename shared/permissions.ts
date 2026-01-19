export const PERMISSIONS = {
  PROFESSIONAL_CREATE: "PROFESSIONAL_CREATE",
};

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

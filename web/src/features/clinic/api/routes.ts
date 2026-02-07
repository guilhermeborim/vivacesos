import { api } from "core/api/shared/api_helper";
import * as url from "core/api/shared/url_helper";
import { UpdateClinicFormTypeSchema } from "../schemas";

type Clinic = {
  name: string;
};

export const getClinicById = (clinicId: string) =>
  api.get(url.GET_CLINIC_BY_ID.replace(":clinicId", clinicId));
export const getClinicsByUser = () =>
  api.get<Clinic[]>(url.GET_CLINICS_BY_USER);
export const putClinicById = (
  clinicId: string,
  payload: UpdateClinicFormTypeSchema,
) => api.put(url.PUT_CLINIC_BY_ID.replace(":clinicId", clinicId), payload);

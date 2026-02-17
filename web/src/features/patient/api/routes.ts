import { api } from "@/core/api/shared/api_helper";
import * as url from "@/core/api/shared/url_helper";
import { CreatePatientTypeSchema } from "../schemas";

export const getPatientById = (patientId: string) =>
  api.get(url.GET_PATIENT_BY_ID.replace(":patientId", patientId));
export const getPatients = () => api.get(url.GET_PATIENTS);

//INVITE
export const postPatient = (payload: CreatePatientTypeSchema) =>
  api.post(url.POST_PATIENT, payload);

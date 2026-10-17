import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import { Triage } from "@/shared/types"
import { TriageFormOutput } from "../schemas"

export const getTriage = (appointmentId: string) =>
  api.get<Triage>(url.GET_TRIAGE.replace(":appointmentId", appointmentId))

export const putTriage = (appointmentId: string, payload: TriageFormOutput) =>
  api.put<Triage>(url.PUT_TRIAGE.replace(":appointmentId", appointmentId), payload)

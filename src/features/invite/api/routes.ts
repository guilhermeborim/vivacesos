import { api } from "@/core/api/shared/api_helper";
import * as url from "@/core/api/shared/url_helper";

export const getInviteByToken = (token: string) =>
  api.get(url.GET_INVITE_BY_TOKEN.replace(":token", token));

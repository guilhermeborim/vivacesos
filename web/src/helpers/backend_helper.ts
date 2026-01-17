import { api } from "./api_helper";
import * as url from "./url_helper";

// Login Method
export const postLogin = (data: any) => api.post(url.POST_LOGIN, data);

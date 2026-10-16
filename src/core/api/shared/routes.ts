import { api } from "./api_helper"
import * as url from "./url_helper"

export const postRefreshToken = () => api.post(url.POST_REFRESH_TOKEN)

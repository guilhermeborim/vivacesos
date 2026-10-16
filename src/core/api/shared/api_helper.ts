import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { postRefreshToken } from "./routes"
import * as url from "./url_helper"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

/** Disparado quando o refresh token também não vale mais: a sessão acabou. */
export const SESSION_EXPIRED_EVENT = "auth:session-expired"

/**
 * Erros de token que o refresh resolve. TOKEN_NOT_PROVIDED entra porque o navegador descarta o
 * cookie do access token quando ele expira: a API então não recebe token nenhum.
 */
const REFRESHABLE = ["TOKEN_EXPIRED", "TOKEN_INVALID", "TOKEN_NOT_PROVIDED"]

/** Chamadas de autenticação nunca disparam refresh (evita laço e mascara senha errada). */
const AUTH_URLS = [url.POST_LOGIN, url.POST_REGISTER, url.POST_REFRESH_TOKEN, url.POST_LOGOUT]

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean }

// Várias requisições podem falhar juntas: todas esperam o mesmo refresh.
let refreshing: Promise<void> | null = null

const refreshOnce = () => {
  refreshing ??= postRefreshToken()
    .then(() => undefined)
    .finally(() => {
      refreshing = null
    })
  return refreshing
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ errorType?: string }>) => {
    const config = error.config as RetryableConfig | undefined
    const errorType = error.response?.data?.errorType

    const shouldRefresh =
      error.response?.status === 401 &&
      !!errorType &&
      REFRESHABLE.includes(errorType) &&
      !!config &&
      !config._retry &&
      !AUTH_URLS.some((u) => config.url?.endsWith(u))

    if (!shouldRefresh) return Promise.reject(error)

    config._retry = true
    try {
      await refreshOnce()
    } catch {
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT))
      return Promise.reject(error)
    }
    return api.request(config)
  },
)

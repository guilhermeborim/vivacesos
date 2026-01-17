import { AxiosError } from "axios";
import { postLogin } from "helpers/backend_helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { SignFormSchema } from "../schemas";

export function useAuth() {
  const navigate = useNavigate();

  async function signIn(payload: SignFormSchema) {
    try {
      const response: any = await postLogin(payload);
      const token = response.token;
      if (token) {
        toast.success("Conectado com sucesso!");
        // await new Promise((resolve) => setTimeout(resolve, 50));
        navigate("/dashboard");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || "Erro ao autenticar");
      }
    }
  }

  return {
    signIn,
  };
}

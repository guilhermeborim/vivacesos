import { useAuth } from "@/shared/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { loginFormSchema, LoginFormTypeSchema } from "../schemas"

export const useLogin = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [connectingUser, setConnectingUser] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const form = useForm<LoginFormTypeSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  function handleSubmit(payload: LoginFormTypeSchema) {
    setConnectingUser(async () => {
      await login(payload)
    })
  }

  return {
    connectingUser,
    showPassword,
    toggleShowPassword,
    form,
    handleSubmit,
    navigate,
  }
}

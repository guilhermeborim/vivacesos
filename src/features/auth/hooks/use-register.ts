import { useAuth } from "@/shared/hooks"
import { registerFormSchema, RegisterFormTypeSchema } from "@/shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

export const useRegister = () => {
  const { register } = useAuth()
  const [registerUser, setRegisterUser] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }
  const form = useForm<RegisterFormTypeSchema>({
    resolver: zodResolver(registerFormSchema),
  })

  function handleSubmit(payload: RegisterFormTypeSchema) {
    setRegisterUser(async () => {
      await register(payload)
    })
  }
  return {
    registerUser,
    showPassword,
    toggleShowPassword,
    handleSubmit,
    form,
  }
}

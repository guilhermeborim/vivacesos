import { useAuth } from "@/shared/hooks"
import { registerFormSchema, RegisterFormTypeSchema } from "@/shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { useQueryInviteByToken } from "../api"

export const useInvite = () => {
  const [params] = useSearchParams()
  const { register } = useAuth()
  const [registerUser, setRegisterUser] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const { data } = useQueryInviteByToken(params.get("token") as string)

  const form = useForm<RegisterFormTypeSchema>({
    resolver: zodResolver(registerFormSchema),
  })

  useEffect(() => {
    if (data && data.data) {
      form.setValue("email", data.data.email)
    }
  }, [data])

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  function handleSubmit(payload: RegisterFormTypeSchema) {
    setRegisterUser(async () => {
      await register(payload)
    })
  }

  return {
    actions: {
      toggleShowPassword,
      handleSubmit,
      form,
    },
    data: {
      data,
      registerUser,
      showPassword,
    },
  }
}

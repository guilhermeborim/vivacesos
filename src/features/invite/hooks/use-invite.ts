import { useAuth } from "@/shared/hooks"
import { registerFormSchema, RegisterFormTypeSchema } from "@/shared/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import z from "zod"
import { useQueryInviteByToken } from "../api"

const professionalStepSchema = z.object({
  crm: z
    .string("O CRM é obrigatório")
    .trim()
    .min(5, "O CRM deve ter no mínimo 5 caracteres")
    .max(10, "O CRM deve ter no máximo 10 caracteres"),
  specialty: z
    .string("A especialidade é obrigatória")
    .trim()
    .min(1, "A especialidade é obrigatória")
    .max(30, "A especialidade deve ter no máximo 30 caracteres"),
})

export const useInvite = () => {
  const [params] = useSearchParams()
  const { register } = useAuth()
  const [registerUser, setRegisterUser] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [wantsToAttend, setWantsToAttend] = useState(false)
  const token = params.get("token") as string
  const { data } = useQueryInviteByToken(token)

  const role = data?.data.role as string | undefined
  // PROFISSIONAL sempre cadastra CRM e especialidade; ADMIN escolhe se também atende.
  const offersProfessional = role === "ADMIN"
  const needsProfessional = role === "PROFISSIONAL" || (offersProfessional && wantsToAttend)

  const form = useForm<RegisterFormTypeSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { professional: { type: "MEDICO", crm: "", specialty: "" } },
  })

  useEffect(() => {
    if (data && data.data) {
      form.setValue("email", data.data.email)
    }
  }, [data])

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const goBack = () => setStep(1)

  function handleSubmit(payload: RegisterFormTypeSchema) {
    // Etapa 1 de 2: os dados de acesso já passaram na validação; segue para o profissional.
    if (needsProfessional && step === 1) {
      setStep(2)
      return
    }

    if (needsProfessional) {
      const parsed = professionalStepSchema.safeParse(payload.professional)
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          form.setError(`professional.${String(issue.path[0])}` as "professional.crm", {
            message: issue.message,
          })
        }
        return
      }
      payload = {
        ...payload,
        professional: { type: "MEDICO", ...parsed.data },
      }
    } else {
      payload = { ...payload, professional: undefined }
    }

    setRegisterUser(async () => {
      await register({ ...payload, inviteToken: token })
    })
  }

  return {
    actions: {
      toggleShowPassword,
      handleSubmit,
      goBack,
      setWantsToAttend,
      form,
    },
    data: {
      data,
      registerUser,
      showPassword,
      step,
      offersProfessional,
      needsProfessional,
      wantsToAttend,
    },
  }
}

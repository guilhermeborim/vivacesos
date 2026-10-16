import { useAuth } from "@/shared/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { postNextStep, useMutationCreateProfessionalOnboarding } from "../api"
import {
  createProfessionalOnboardingSchema,
  CreateProfessionalOnboardingTypeSchema,
} from "../schemas"

export const useInitialStepProfessional = () => {
  const { session } = useAuth()
  const queryClient = useQueryClient()

  const [isSkipping, setIsSkipping] = useState(false)

  const mutationCreateProfessionalOnboarding = useMutationCreateProfessionalOnboarding()

  const formProfessionalOnboarding = useForm<CreateProfessionalOnboardingTypeSchema>({
    resolver: zodResolver(createProfessionalOnboardingSchema),
    defaultValues: {
      type: "MEDICO",
    },
  })

  const handleSubmitProfessionalOnboarding = async (
    payload: CreateProfessionalOnboardingTypeSchema,
  ) => {
    await mutationCreateProfessionalOnboarding.mutateAsync(payload)
    await postNextStep({ step: "DONE" })
    queryClient.invalidateQueries({ queryKey: ["session"] })
  }

  /** Quem não atende pacientes segue sem cadastro de profissional. */
  const handleSkipProfessional = async () => {
    setIsSkipping(true)
    try {
      await postNextStep({ step: "DONE" })
      await queryClient.invalidateQueries({ queryKey: ["session"] })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao pular etapa")
      }
    } finally {
      setIsSkipping(false)
    }
  }

  useEffect(() => {
    if (session?.user.id && session.clinics[0]?.clinicId) {
      formProfessionalOnboarding.setValue("userId", session.user.id)
      formProfessionalOnboarding.setValue("clinicId", session.clinics[0]?.clinicId)
    }
  }, [session?.user.id, session?.clinics[0]?.clinicId])

  return {
    actions: {
      mutationCreateProfessionalOnboarding,
      handleSubmitProfessionalOnboarding,
      handleSkipProfessional,
      formProfessionalOnboarding,
    },
    isLoading: {
      isPendingProfessionalOnboarding: mutationCreateProfessionalOnboarding.isPending,
      isSkipping,
    },
  }
}

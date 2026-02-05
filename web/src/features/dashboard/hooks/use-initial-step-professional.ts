import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "features/auth/hooks/use-auth";
import {
  createProfessionalOnboardingBodySchema,
  CreateProfessionalOnboardingBodySchema,
} from "features/professional/schemas";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutationCreateProfessionalOnboarding } from "../api/mutations";
import { postNextStep } from "../api/routes";

export const useInitialStepProfessional = () => {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  const mutationCreateProfessionalOnboarding =
    useMutationCreateProfessionalOnboarding();

  const formProfessionalOnboarding =
    useForm<CreateProfessionalOnboardingBodySchema>({
      resolver: zodResolver(createProfessionalOnboardingBodySchema),
      defaultValues: {
        type: "MEDICO",
      },
    });

  const onSubmitProfessionalOnboarding = async (
    data: CreateProfessionalOnboardingBodySchema,
  ) => {
    try {
      await mutationCreateProfessionalOnboarding.mutateAsync(data);
      await postNextStep({ step: "DONE" });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    } catch (error) {}
  };

  useEffect(() => {
    if (session?.user.id && session.clinics[0]?.clinicId) {
      formProfessionalOnboarding.setValue("userId", session.user.id);
      formProfessionalOnboarding.setValue(
        "clinicId",
        session.clinics[0]?.clinicId,
      );
    }
  }, [session?.user.id, session?.clinics[0]?.clinicId]);

  return {
    mutationCreateProfessionalOnboarding,
    onSubmitProfessionalOnboarding,
    formProfessionalOnboarding,
  };
};

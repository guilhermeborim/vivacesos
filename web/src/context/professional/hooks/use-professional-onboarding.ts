import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "context/auth/hooks/use-auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutationCreateProfessionalOnboarding } from "shared/mutations/professional";
import {
  createProfessionalOnboardingBodySchema,
  CreateProfessionalOnboardingBodySchema,
} from "../schemas";

export function useProfessionalOnboarding() {
  const { session } = useAuth();
  const mutationCreateProfessionalOnboarding =
    useMutationCreateProfessionalOnboarding();

  const formProfessionalOnboarding =
    useForm<CreateProfessionalOnboardingBodySchema>({
      resolver: zodResolver(createProfessionalOnboardingBodySchema),
      defaultValues: {
        type: "MEDICO",
      },
    });

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
    formProfessionalOnboarding,
  };
}

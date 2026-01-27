import { useQueryClient } from "@tanstack/react-query";
import { CreateClinicFormSchema } from "context/clinic/schemas";
import { CreateProfessionalOnboardingBodySchema } from "context/professional/schemas";
import { postNextStep } from "helpers/backend_helper";
import { useEffect, useState } from "react";
import { useMutationCreateClinic } from "shared/mutations/clinic";
import { useMutationCreateProfessionalOnboarding } from "shared/mutations/professional";

export function useInitialSteps(step: string) {
  const mutationCreateClinic = useMutationCreateClinic();
  const mutationCreateProfessionalOnboarding =
    useMutationCreateProfessionalOnboarding();
  const queryClient = useQueryClient();
  const [activeTab, setactiveTab] = useState(
    step === "CREATE_CLINIC" ? 1 : step === "LINK_PROFESSIONAL" ? 2 : 3,
  );
  const [progressbarvalue, setprogressbarvalue] = useState(
    step === "CREATE_CLINIC" ? 0 : step === "LINK_PROFESSIONAL" ? 50 : 100,
  );

  const onSubmitClinic = async (data: CreateClinicFormSchema) => {
    try {
      await mutationCreateClinic.mutateAsync(data);
      await postNextStep({ step: "LINK_PROFESSIONAL" });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    } catch (error) {}
  };

  const onSubmitProfessionalOnboarding = async (
    data: CreateProfessionalOnboardingBodySchema,
  ) => {
    try {
      await mutationCreateProfessionalOnboarding.mutateAsync(data);
      await postNextStep({ step: "DONE" });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    } catch (error) {}
  };

  const onSubmitFinishedOnboarding = async () => {
    await postNextStep({ step: "FINISHED" });
    queryClient.invalidateQueries({ queryKey: ["session"] });
  };

  useEffect(() => {
    if (step === "CREATE_CLINIC") {
      setactiveTab(1);
      setprogressbarvalue(0);
    } else if (step === "LINK_PROFESSIONAL") {
      setactiveTab(2);
      setprogressbarvalue(50);
    } else if (step === "DONE") {
      setactiveTab(3);
      setprogressbarvalue(100);
    }
  }, [step]);

  return {
    mutationCreateClinic,
    onSubmitClinic,
    mutationCreateProfessionalOnboarding,
    onSubmitProfessionalOnboarding,
    onSubmitFinishedOnboarding,
    activeTab,
    progressbarvalue,
  };
}

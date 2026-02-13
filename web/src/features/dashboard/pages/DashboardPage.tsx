import { BaseLayout } from "@/core/ui";
import { useAuth } from "@/features/auth/hooks/use-auth";
import InitialSteps from "@/features/dashboard/components/initial_steps";
import ModalSelectClinic from "../components/modal_select_clinic";
import ModalWelcome from "../components/modal_welcome";

export function DashboardPage() {
  const { session } = useAuth();

  return (
    <BaseLayout.Root
      title={`Bem Vindo ${session?.activeClinic ? "á " + session.activeClinic.name : ""}`}
      pageTitle={"Início"}
    >
      {(session?.clinics.length === 0 ||
        session?.user.onboardingStep !== "FINISHED") && (
        <BaseLayout.Body>
          <InitialSteps step={session!.user.onboardingStep} />
        </BaseLayout.Body>
      )}
      {session?.clinics.length === 0 &&
        session.user.onboardingStep === "CREATE_CLINIC" && (
          <ModalWelcome
            isOpen={
              session?.clinics.length === 0 &&
              session?.user.onboardingStep === "CREATE_CLINIC"
            }
          />
        )}
      {session?.clinics && session?.clinics.length > 1 && (
        <ModalSelectClinic
          clinics={session?.clinics ?? []}
          isOpen={!session?.activeClinic}
          onClose={() => console.log("close")}
        />
      )}
    </BaseLayout.Root>
  );
}

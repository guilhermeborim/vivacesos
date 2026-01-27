import BreadCrumb from "Components/Common/BreadCrumb";
import { useAuth } from "features/auth/hooks/use-auth";
import InitialSteps from "features/dashboard/components/initial_steps";
import ModalSelectClinic from "features/dashboard/components/modal_select_clinic";
import ModalWelcome from "features/dashboard/components/modal_welcome";
import { Card, CardBody, Container } from "reactstrap";

const Dashboard = () => {
  const { session } = useAuth();

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title={`Bem Vindo ${session?.activeClinic ? "á " + session.activeClinic.name : ""}`}
          pageTitle={"Início"}
        />
        <Card>
          <CardBody>
            {(session?.clinics.length === 0 ||
              session?.user.onboardingStep !== "FINISHED") && (
              <InitialSteps step={session!.user.onboardingStep} />
            )}
          </CardBody>
        </Card>
      </Container>
      <ModalWelcome
        isOpen={
          session?.clinics.length === 0 &&
          session?.user.onboardingStep === "CREATE_CLINIC"
        }
      />
      {session?.clinics && session?.clinics.length > 1 && (
        <ModalSelectClinic
          clinics={session?.clinics ?? []}
          isOpen={!session?.activeClinic}
          onClose={() => console.log("close")}
        />
      )}
    </div>
  );
};

export default Dashboard;

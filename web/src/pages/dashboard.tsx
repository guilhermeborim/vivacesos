import BreadCrumb from "Components/Common/BreadCrumb";
import { useAuth } from "context/auth/hooks/use-auth";
import { Button, Card, CardBody, Container } from "reactstrap";
import { PERMISSIONS } from "../../../shared/permissions";

const Dashboard = () => {
  const { hasPermission } = useAuth();
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title={"Bem Vindo"} pageTitle={"Início"} />
        <Card>
          <CardBody>
            <h1>Welcome to the Dashboard</h1>
            {hasPermission(PERMISSIONS.PROFESSIONAL_CREATE) && (
              <Button>Salvar</Button>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;

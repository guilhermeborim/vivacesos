import BreadCrumb from "Components/Common/BreadCrumb";
import { Button, Card, CardBody, Container } from "reactstrap";

const Dashboard = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title={"Bem Vindo"} pageTitle={"Início"} />
        <Card>
          <CardBody>
            <h1>Welcome to the Dashboard</h1>
            <Button>Salvar</Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;

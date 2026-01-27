import BreadCrumb from "Components/Common/BreadCrumb";
import ListClinic from "context/clinic/components/list";
import { Button, Card, CardBody, CardHeader, Container } from "reactstrap";

const ClinicList = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title={`Clínicas`} pageTitle={"Administração"} />
        <Card>
          <CardHeader className="d-flex align-items-center">
            <div className="d-flex ms-auto gap-1">
              <Button
                type="button"
                color="success"
                className="btn create-btn"
                data-bs-toggle="modal"
                data-bs-target="#clinic-modal"
              >
                Adicionar
              </Button>
              <Button
                type="button"
                color="info"
                className="btn create-btn"
                data-bs-toggle="modal"
                data-bs-target="#export-clinic-modal"
              >
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <ListClinic />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ClinicList;

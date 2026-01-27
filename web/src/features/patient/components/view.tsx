import { Loading } from "Components/Common/Loading";
import { Link } from "react-router-dom";
import { Button, CardFooter, Col, Row } from "reactstrap";
import { usePatient } from "../hooks/use-patient";
import { createPatientFormSchema } from "../schemas";
import FormPatient from "./form";

const PatientViewComponent = ({ id }: { id: string }) => {
  const { getById } = usePatient();
  const { data: patientData, isLoading } = getById(id);

  // if (isLoading || !patientData) {
  //   return <Loading loading={isLoading} />;
  // }

  return (
    <>
      {isLoading && <Loading loading={isLoading} />}
      <Row>
        <Col lg={12}>
          <FormPatient
            mode="view"
            onSubmit={() => {}}
            schema={createPatientFormSchema}
            defaultValues={patientData}
          >
            <CardFooter className="d-flex justify-content-end gap-2">
              <Link to={"/patient"}>
                <Button color="warning">Voltar</Button>
              </Link>
            </CardFooter>
          </FormPatient>
        </Col>
      </Row>
    </>
  );
};

export default PatientViewComponent;

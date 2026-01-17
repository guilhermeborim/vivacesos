import { Loading } from "Components/Common/Loading";
import { useTransition } from "react";
import { Link } from "react-router-dom";
import { Button, CardFooter, Col, Row } from "reactstrap";
import { usePatient } from "../hooks/use-patient";
import { createPatientFormSchema, CreatePatientFormSchema } from "../schemas";
import FormPatient from "./form";

const PatientCreateComponent = () => {
  const { create } = usePatient();
  const [creatingPatient, setCreatingPatient] = useTransition();

  const handleSubmit = (payload: CreatePatientFormSchema) => {
    setCreatingPatient(async () => {
      await create.mutateAsync(payload);
    });
  };

  return (
    <>
      {creatingPatient && <Loading loading={creatingPatient} />}
      <Row>
        <Col lg={12}>
          <FormPatient
            mode="create"
            onSubmit={handleSubmit}
            schema={createPatientFormSchema}
            success={create.isSuccess}
          >
            <CardFooter className="d-flex justify-content-end gap-2">
              <Button color="success" type="submit">
                Salvar
              </Button>
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

export default PatientCreateComponent;

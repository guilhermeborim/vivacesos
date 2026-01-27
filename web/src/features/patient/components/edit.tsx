import { Loading } from "Components/Common/Loading";
import { useTransition } from "react";
import { Link } from "react-router-dom";
import { Button, CardFooter, Col, Row } from "reactstrap";
import { usePatient } from "../hooks/use-patient";
import { updatePatientFormSchema, UpdatePatientFormSchema } from "../schemas";
import FormPatient from "./form";

const PatientEditComponent = ({ id }: { id: string }) => {
  const { edit, getById } = usePatient();
  const { data: patientData, isLoading } = getById(id);

  const [editingPatient, setEditingPatient] = useTransition();

  const handleSubmit = (payload: UpdatePatientFormSchema) => {
    setEditingPatient(async () => {
      await edit.mutateAsync({ id, payload });
    });
  };

  if (isLoading || !patientData) {
    return <Loading loading={isLoading} />;
  }

  return (
    <>
      {editingPatient && <Loading loading={editingPatient} />}
      <Row>
        <Col lg={12}>
          <FormPatient
            mode="edit"
            onSubmit={handleSubmit}
            schema={updatePatientFormSchema}
            success={edit.isSuccess}
            defaultValues={patientData}
          >
            <CardFooter className="d-flex justify-content-end gap-2">
              <Button color="success" type="submit">
                Atualizar
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

export default PatientEditComponent;

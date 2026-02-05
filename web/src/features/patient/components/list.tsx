import DeleteModal from "Components/Common/DeleteModal";
import HeaderList from "Components/Common/HeaderList";
import { Loading } from "Components/Common/Loading";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, Col, Row } from "reactstrap";
import { usePatient } from "../hooks/use-patient";
import { Patient } from "../models/Patient";

const PatientListComponent = () => {
  const { data, isLoading, desative } = usePatient();
  const [search, setSearch] = useState("");
  const [modalDeletePatient, setModalDeletePatient] = useState(false);
  const [patient, setPatient] = useState<Patient>();
  const [desativePatient, setDesativePatient] = useTransition();

  const handleDesativePatient = () => {
    setDesativePatient(async () => {
      await desative.mutateAsync({
        id: patient?.idpatient as string,
        payload: patient!,
      });
      setModalDeletePatient(false);
    });
  };

  if (desativePatient) {
    return <Loading loading={desativePatient} />;
  }

  return (
    <>
      {isLoading && <Loading loading={isLoading} />}
      <HeaderList
        search={search}
        setSearch={setSearch}
        href="/patient/create"
      />
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Col lg={12}>
                  <DataTable value={data} paginator rows={8}>
                    <Column
                      field="name"
                      header="Nome"
                      style={{ width: "25%" }}
                    />
                    <Column
                      field="active"
                      header="STATUS"
                      style={{ width: "10%" }}
                      body={(row: Patient) => (
                        <Badge color={`${row.active ? "success" : "danger"}`}>
                          {row.active ? "ATIVO" : "INATIVO"}
                        </Badge>
                      )}
                    />
                    <Column
                      header="Ações"
                      body={(row: Patient) => (
                        <div className="d-flex gap-3 justify-center">
                          <Link
                            to={`/patient/view/${row.idpatient}`}
                            className={`d-inline-block`}
                          >
                            <i className="ri-eye-fill text-success"></i>
                          </Link>
                          <Link
                            to={`/patient/edit/${row.idpatient}`}
                            className={`d-inline-block`}
                          >
                            <i className="ri-pencil-fill text-primary"></i>
                          </Link>
                          {row.active ? (
                            <Link
                              to={"#"}
                              className={`d-inline-block`}
                              onClick={() => {
                                setModalDeletePatient(true);
                                setPatient(row);
                              }}
                            >
                              <i className="ri-spam-line text-danger"></i>
                            </Link>
                          ) : (
                            <Link
                              to={"#"}
                              className={`d-inline-block`}
                              onClick={() => {
                                setModalDeletePatient(true);
                                setPatient(row);
                              }}
                            >
                              <i className="ri-spam-line text-success"></i>
                            </Link>
                          )}
                        </div>
                      )}
                      style={{ width: "15%" }}
                    />
                  </DataTable>
                </Col>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <DeleteModal
        show={modalDeletePatient}
        onCloseClick={() => setModalDeletePatient(false)}
        onDeleteClick={handleDesativePatient}
        text={`Tem certeza que deseja ${
          patient?.active === true ? "desativar" : "ativar"
        } esse Paciente?`}
        textButton={`${patient?.active === true ? "Desativar" : "Ativar"}`}
        className={`${patient?.active === true ? "btn-danger" : "btn-success"}`}
      />
    </>
  );
};

export default PatientListComponent;

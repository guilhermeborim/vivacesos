import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

const Cover403 = () => {
  return (
    <React.Fragment>
      <div className="auth-page-content">
        <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
          <div className="auth-page-content overflow-hidden p-0">
            <Container>
              <Row className="justify-content-center">
                <Col xl={7} lg={8}>
                  <div className="text-center">
                    <h1 className="error-text  fw-bold">403</h1>

                    <div className="mt-3">
                      <h3 className="text-uppercase">Acesso Negado!</h3>
                      <p className="text-muted mb-4">
                        Você não tem permissão para acessar essa Página!
                      </p>
                      <Link to="/dashboard" className="btn btn-success">
                        <i className="mdi mdi-home me-1"></i>Voltar ao Início
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cover403;

import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

// Import Images
import error500 from "../../../assets/images/error500.png";

export function Error500Page() {
  return (
    <React.Fragment>
      <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="auth-page-content overflow-hidden p-0">
          <Container fluid={true}>
            <Row className="justify-content-center">
              <Col xl={4} className="text-center">
                <div className="error-500 position-relative">
                  <img
                    src={error500}
                    alt=""
                    className="img-fluid error-500-img error-img"
                  />
                  <h1 className="title text-muted">500</h1>
                </div>
                <div>
                  <h4>Erro Interno do Servidor!</h4>
                  <p className="text-muted w-75 mx-auto">
                    Erro do Servidor 500. Não temos certeza do que aconteceu,
                    mas nossos servidores indicam que algo está errado.
                  </p>
                  <Link to="/dashboard" className="btn btn-success">
                    <i className="mdi mdi-home me-1"></i>Voltar para o início
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
}

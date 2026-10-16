import React from "react";
import { Col, Container, Row } from "reactstrap";

export const FooterRest = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © Vivace.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                Sistema Operacional de Saúde
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

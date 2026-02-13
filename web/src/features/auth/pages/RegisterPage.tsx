import React from "react";
import { Col, Container, Row } from "reactstrap";

import { FooterAuth } from "core/ui";
import SignUp from "features/auth/components/register";

export function RegisterPage() {
  return (
    <React.Fragment>
      <FooterAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <span
                      className=" d-block"
                      style={{ height: "100px", opacity: 0 }}
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <SignUp />
          </Container>
        </div>
      </FooterAuth>
    </React.Fragment>
  );
}

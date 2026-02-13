import React from "react";
import { Col, Container, Row } from "reactstrap";

import { FooterAuth } from "@/core/ui";
import Sign from "@/features/auth/components/login";

export function LoginPage() {
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
                      style={{ height: "180px", opacity: 0 }}
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <Sign />
          </Container>
        </div>
      </FooterAuth>
    </React.Fragment>
  );
}

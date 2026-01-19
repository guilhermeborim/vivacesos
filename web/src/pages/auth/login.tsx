import React from "react";
import { Col, Container, Row } from "reactstrap";
import ParticlesAuth from "../../Components/constants/footer-auth";

import Sign from "context/auth/components/login";
import withRouter from "../../Components/Common/withRouter";

const Login = () => {
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <span
                      className=" d-block"
                      style={{ height: "180px", opacity: 0 }}
                    >
                      a
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <Sign />
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Login);

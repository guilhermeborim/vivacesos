import React from "react";
import { Col, Container, Row } from "reactstrap";
import ParticlesAuth from "../../Components/constants/footer-auth";

import SignUp from "features/auth/components/register";
import withRouter from "../../Components/Common/withRouter";

const Register = () => {
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
                      style={{ height: "100px", opacity: 0 }}
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <SignUp />
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Register);

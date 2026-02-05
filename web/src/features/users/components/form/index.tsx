import { useEffect } from "react";
import { Col, Row } from "reactstrap";
import { SelectController } from "shared/components";
import { InputController } from "shared/components/InputController";

interface FormUserProps {
  formUser: any;
  defaultValues?: any;
}

export default function FormUser({ formUser, defaultValues }: FormUserProps) {
  useEffect(() => {
    if (defaultValues) {
      formUser.reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <>
      <Row>
        <Col lg={6}>
          <InputController
            label="E-mail"
            control={formUser.control}
            name={"email"}
            placeholder="example@example.com"
          />
        </Col>
        <Col lg={6}>
          <SelectController
            control={formUser.control}
            name="role"
            options={[
              { label: "Profissional", value: "PROFISSIONAL" },
              { label: "Recepcionista", value: "RECEPCIONISTA" },
            ]}
            label="Cargo"
          />
        </Col>
      </Row>
    </>
  );
}

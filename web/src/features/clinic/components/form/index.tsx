import { InputController, InputMaskController } from "@/core/ui";
import { useEffect } from "react";
import { Col, Row } from "reactstrap";

interface FormClinicProps {
  formClinic: any;
  defaultValues?: any;
}

export default function FormClinic({
  formClinic,
  defaultValues,
}: FormClinicProps) {
  useEffect(() => {
    if (defaultValues) {
      formClinic.reset(defaultValues);
    }
  }, [defaultValues]);
  return (
    <>
      <Row>
        <Col lg={3}>
          <InputController
            label="Nome"
            control={formClinic.control}
            name={"name"}
            placeholder="Nome da Clínica"
          />
        </Col>
        <Col lg={2}>
          <InputMaskController
            label="CNPJ"
            control={formClinic.control}
            name={"cnpj"}
            mask="99.999.999/9999-99"
            placeholder="CNPJ da Clínica"
          />
        </Col>
        <Col lg={2}>
          <InputMaskController
            label="Telefone"
            control={formClinic.control}
            name={"phone"}
            mask="(99) 99999-9999"
            placeholder="Telefone da Clínica"
          />
        </Col>
        <Col lg={2}>
          <InputMaskController
            label="CEP"
            control={formClinic.control}
            name={"cep"}
            mask="99999-999"
            placeholder="CEP da Clínica"
          />
        </Col>
        <Col lg={3}>
          <InputController
            label="Rua"
            control={formClinic.control}
            name={"road"}
            placeholder="Rua da Clínica"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={3}>
          <InputController
            label="Bairro"
            control={formClinic.control}
            name="neighborhood"
            placeholder="Bairro da Clínica"
          />
        </Col>
        <Col lg={2}>
          <InputController
            label="Cidade"
            control={formClinic.control}
            name="city"
            placeholder="Cidade da Clínica"
          />
        </Col>
        <Col lg={2}>
          <InputController
            label="Número"
            control={formClinic.control}
            name="number"
            placeholder="Número"
          />
        </Col>
        <Col lg={2}>
          <InputController
            label="Complemento"
            control={formClinic.control}
            name="complement"
            placeholder="Complemento"
          />
        </Col>
      </Row>
    </>
  );
}

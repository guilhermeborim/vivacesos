import { useEffect } from "react";
import { Col, Row } from "reactstrap";
import { InputMaskController } from "shared/components";
import { InputController } from "shared/components/InputController";

interface FormProfessionalProps {
  formProfessional: any;
  defaultValues?: any;
}

export default function FormProfessional({
  formProfessional,
  defaultValues,
}: FormProfessionalProps) {
  useEffect(() => {
    if (defaultValues) {
      formProfessional.reset(defaultValues);
    }
  }, [defaultValues]);
  return (
    <>
      <Row>
        <Col lg={3}>
          <InputController
            label="Nome"
            control={formProfessional.control}
            name={"name"}
            placeholder="Nome da Clínica"
          />
        </Col>
        <Col lg={2}>
          <InputMaskController
            label="CNPJ"
            control={formProfessional.control}
            name={"cnpj"}
            mask="99.999.999/9999-99"
            placeholder="CNPJ da Clínica"
          />
        </Col>
        <Col lg={2}>
          <InputMaskController
            label="Telefone"
            control={formProfessional.control}
            name={"phone"}
            mask="(99) 99999-9999"
            placeholder="Telefone da Clínica"
          />
        </Col>
        <Col lg={2}>
          <InputMaskController
            label="CEP"
            control={formProfessional.control}
            name={"cep"}
            mask="99999-999"
            placeholder="CEP da Clínica"
          />
        </Col>
        <Col lg={3}>
          <InputController
            label="Rua"
            control={formProfessional.control}
            name={"road"}
            placeholder="Rua da Clínica"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={3}>
          <InputController
            label="Bairro"
            control={formProfessional.control}
            name="neighborhood"
            placeholder="Bairro da Clínica"
          />
        </Col>
        <Col lg={2}>
          <InputController
            label="Cidade"
            control={formProfessional.control}
            name="city"
            placeholder="Cidade da Clínica"
          />
        </Col>
        <Col lg={2}>
          <InputController
            label="Número"
            control={formProfessional.control}
            name="number"
            placeholder="Número"
          />
        </Col>
        <Col lg={2}>
          <InputController
            label="Complemento"
            control={formProfessional.control}
            name="complement"
            placeholder="Complemento"
          />
        </Col>
      </Row>
    </>
  );
}

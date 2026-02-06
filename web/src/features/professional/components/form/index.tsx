import { useEffect } from "react";
import { Col, Row } from "reactstrap";
import { SelectController } from "shared/components";
import { InputController } from "shared/components/InputController";

interface FormProfessionalProps {
  formProfessional: any;
  defaultValues?: any;
  users: any;
}

export default function FormProfessional({
  formProfessional,
  defaultValues,
  users,
}: FormProfessionalProps) {
  const type = formProfessional.watch("type");

  useEffect(() => {
    if (defaultValues) {
      formProfessional.reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <>
      <Row className="gap-3">
        <Col lg={12}>
          <SelectController
            control={formProfessional.control}
            name="userId"
            options={
              users?.map((user: any) => ({
                label: user.user.name,
                value: user.user.id_user,
              })) ?? []
            }
            label="Selecione o Usuário"
          />
        </Col>
        <Col lg={12}>
          <SelectController
            control={formProfessional.control}
            name="type"
            options={[
              { label: "Médico", value: "MEDICO" },
              {
                label: "Mais categorias em breve!",
                value: "",
                isDisabled: true,
              },
            ]}
            label="Tipo de Profissional"
          />
        </Col>
        {type && (
          <>
            <Col lg={12}>
              <InputController
                control={formProfessional.control}
                name="crm"
                label="CRM"
                placeholder="CRM do Profissional"
              />
            </Col>
            <Col lg={12}>
              <InputController
                control={formProfessional.control}
                name="specialty"
                label="Especialidade"
                placeholder="Especialidade do Profissional"
              />
            </Col>
          </>
        )}
      </Row>
    </>
  );
}

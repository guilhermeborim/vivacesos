import { InputController, SelectController } from "@/core/ui";
import { User } from "@/shared/types";
import { useEffect } from "react";
import { Col, Row } from "reactstrap";

interface FormProfessionalProps {
  formProfessional: any;
  defaultValues?: any;
  users: User[];
  isEdit?: boolean;
}

export function FormProfessional({
  formProfessional,
  defaultValues,
  users,
  isEdit = false,
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
        {!isEdit && (
          <Col lg={12}>
            <SelectController
              control={formProfessional.control}
              name="userId"
              options={
                users?.map((user) => ({
                  label: user.user.name,
                  value: user.user.userId,
                })) ?? []
              }
              label="Selecione o Usuário"
            />
          </Col>
        )}
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
                minLength={5}
                maxLength={10}
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

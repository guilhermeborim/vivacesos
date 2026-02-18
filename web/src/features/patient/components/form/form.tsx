import { InputController } from "@/core/ui";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { CreatePatientTypeSchema } from "../../schemas";
import { fields } from "./fields";

interface FormPatientProps {
  formPatient: UseFormReturn<CreatePatientTypeSchema>;
  defaultValues?: Partial<CreatePatientTypeSchema>;
}

export function FormPatient({ formPatient, defaultValues }: FormPatientProps) {
  useEffect(() => {
    if (defaultValues) {
      formPatient.reset(defaultValues);
    }
  }, [defaultValues, formPatient]);

  return (
    <Row>
      {fields.map((field) => (
        <Col md={field.md} className="mt-3">
          <InputController
            label={field.label}
            control={formPatient.control}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            mask={field.mask}
          />
        </Col>
      ))}
    </Row>
  );
}

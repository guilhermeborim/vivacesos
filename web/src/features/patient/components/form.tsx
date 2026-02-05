import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "primereact/inputmask";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardBody,
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";

interface FormPatientProps {
  mode: "create" | "edit" | "view";
  onSubmit: (data: any) => void | Promise<void>;
  schema?: any;
  defaultValues?: any;
  children: React.ReactNode;
  success?: boolean;
}

const FormPatient = ({
  mode,
  onSubmit,
  schema,
  defaultValues,
  children,
  success,
}: FormPatientProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const isViewMode = mode === "view";

  useEffect(() => {
    if (success) {
      form.reset(defaultValues);
    }
  }, [success]);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
        <CardBody>
          <Row>
            <Col lg={4}>
              <div>
                <Label htmlFor="name" className="form-label">
                  Nome<span className="text-danger">*</span>
                </Label>
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        value={field.value ?? ""}
                        placeholder="Digite o nome"
                        invalid={!!fieldState.error}
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                      {fieldState.error && (
                        <FormFeedback>{fieldState.error.message}</FormFeedback>
                      )}
                    </>
                  )}
                />
              </div>
            </Col>

            <Col lg={4}>
              <div>
                <Label htmlFor="email" className="form-label">
                  Email
                </Label>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="email"
                        value={field.value ?? ""}
                        placeholder="Digite o email"
                        invalid={!!fieldState.error}
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                    </>
                  )}
                />
              </div>
            </Col>

            <Col lg={2}>
              <div>
                <Label htmlFor="phone" className="form-label">
                  Telefone<span className="text-danger">*</span>
                </Label>
                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <>
                      <InputMask
                        {...field}
                        mask="(99) 99999-9999"
                        className={`form-control ${
                          fieldState.error ? "is-invalid" : ""
                        }`}
                        placeholder="(00) 00000-0000"
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                      {fieldState.error && (
                        <div className="invalid-feedback d-block">
                          {fieldState.error.message}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
            </Col>

            <Col lg={2}>
              <div>
                <Label htmlFor="cpf" className="form-label">
                  CPF<span className="text-danger">*</span>
                </Label>
                <Controller
                  control={form.control}
                  name="cpf"
                  render={({ field, fieldState }) => (
                    <>
                      <InputMask
                        {...field}
                        mask="999.999.999-99"
                        className={`form-control ${
                          fieldState.error ? "is-invalid" : ""
                        }`}
                        placeholder="000.000.000-00"
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                      {fieldState.error && (
                        <div className="invalid-feedback d-block">
                          {fieldState.error.message}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
            </Col>
          </Row>

          <Row className="mt-4 mb-4">
            <Col lg={2}>
              <div>
                <Label htmlFor="birthday" className="form-label">
                  Data de Nascimento
                </Label>
                <Controller
                  control={form.control}
                  name="birthday"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="date"
                        value={field.value ?? ""}
                        invalid={!!fieldState.error}
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                      {fieldState.error && (
                        <FormFeedback>{fieldState.error.message}</FormFeedback>
                      )}
                    </>
                  )}
                />
              </div>
            </Col>

            <Col lg={2}>
              <div>
                <Label htmlFor="zip_code" className="form-label">
                  CEP
                </Label>
                <Controller
                  control={form.control}
                  name="zip_code"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        value={field.value ?? ""}
                        placeholder="00000-000"
                        invalid={!!fieldState.error}
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                      {fieldState.error && (
                        <FormFeedback>{fieldState.error.message}</FormFeedback>
                      )}
                    </>
                  )}
                />
              </div>
            </Col>

            <Col lg={2}>
              <div>
                <Label htmlFor="address" className="form-label">
                  Rua
                </Label>
                <Controller
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        value={field.value ?? ""}
                        placeholder="Digite a rua"
                        invalid={!!fieldState.error}
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                      {fieldState.error && (
                        <FormFeedback>{fieldState.error.message}</FormFeedback>
                      )}
                    </>
                  )}
                />
              </div>
            </Col>

            <Col lg={2}>
              <div>
                <Label htmlFor="neighborhood" className="form-label">
                  Bairro
                </Label>
                <Controller
                  control={form.control}
                  name="neighborhood"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        value={field.value ?? ""}
                        placeholder="Digite o bairro"
                        invalid={!!fieldState.error}
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                      {fieldState.error && (
                        <FormFeedback>{fieldState.error.message}</FormFeedback>
                      )}
                    </>
                  )}
                />
              </div>
            </Col>

            <Col lg={2}>
              <div>
                <Label htmlFor="address_number" className="form-label">
                  Número
                </Label>
                <Controller
                  control={form.control}
                  name="address_number"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Nº"
                        value={field.value ?? ""}
                        invalid={!!fieldState.error}
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                      {fieldState.error && (
                        <FormFeedback>{fieldState.error.message}</FormFeedback>
                      )}
                    </>
                  )}
                />
              </div>
            </Col>

            <Col lg={2}>
              <div>
                <Label htmlFor="complement" className="form-label">
                  Complemento
                </Label>
                <Controller
                  control={form.control}
                  name="complement"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Apto, bloco, etc"
                        invalid={!!fieldState.error}
                        value={field.value ?? ""}
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                      {fieldState.error && (
                        <FormFeedback>{fieldState.error.message}</FormFeedback>
                      )}
                    </>
                  )}
                />
              </div>
            </Col>
          </Row>
        </CardBody>
        {children}
      </form>
    </Card>
  );
};

export default FormPatient;

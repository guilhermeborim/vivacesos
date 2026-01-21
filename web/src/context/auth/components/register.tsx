import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "Components/Common/Loading";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useAuth } from "../hooks/use-auth";
import { registerFormSchema, RegisterFormSchema } from "../schemas";

export default function Register() {
  const { register } = useAuth();
  const [registerUser, setRegisterUser] = React.useTransition();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  function handleSubmit(payload: RegisterFormSchema) {
    setRegisterUser(async () => {
      await register(payload);
    });
  }

  return (
    <>
      {registerUser && <Loading loading={registerUser} />}
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="mt-4 card-bg-fill">
            <CardBody className="p-4">
              <div className="text-center text-white-50"></div>
              <div className="text-center mt-2">
                <h5 className="text-primary">Seja bem-vindo!</h5>
                <p className="text-muted">Faça o cadastro para continuar.</p>
              </div>
              <div className="p-2 mt-4">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className="mb-3">
                    <Label htmlFor="name" className="form-label">
                      Nome
                    </Label>
                    <Controller
                      control={form.control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Seu nome"
                            invalid={!!fieldState.error}
                          />
                          {fieldState.error && (
                            <FormFeedback>
                              {fieldState.error.message}
                            </FormFeedback>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="mb-3">
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
                            placeholder="example@example.com"
                            invalid={!!fieldState.error}
                          />
                          {fieldState.error && (
                            <FormFeedback>
                              {fieldState.error.message}
                            </FormFeedback>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div className="mb-3">
                    <Label className="form-label" htmlFor="password-input">
                      Senha
                    </Label>
                    <div className="position-relative auth-pass-inputgroup mb-3">
                      <Controller
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              {...field}
                              type="password"
                              placeholder="******"
                              invalid={!!fieldState.error}
                            />
                            {fieldState.error && (
                              <FormFeedback>
                                {fieldState.error.message}
                              </FormFeedback>
                            )}
                          </>
                        )}
                      />
                      {!form.formState.errors.password && (
                        <button
                          className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button"
                          id="password-addon"
                        >
                          <i className="ri-eye-fill align-middle"></i>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      color="success"
                      className="btn btn-success w-100"
                      type="submit"
                      disabled={registerUser}
                    >
                      {registerUser ? "Cadastrano..." : "Cadastrar"}
                    </Button>
                  </div>
                  <div className="text-end mt-1">
                    <Link to="/login">Já tem uma conta? Entrar</Link>
                  </div>
                </form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

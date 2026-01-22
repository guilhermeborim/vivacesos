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
import { type LoginFormSchema, loginFormSchema } from "../schemas";

export default function Login() {
  const { login } = useAuth();
  const [connectingUser, setConnectingUser] = React.useTransition();
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  function handleSubmit(payload: LoginFormSchema) {
    setConnectingUser(async () => {
      await login(payload);
    });
  }

  return (
    <>
      {connectingUser && <Loading loading={connectingUser} />}
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="mt-4 card-bg-fill">
            <CardBody className="p-4">
              <div className="text-center text-white-50"></div>
              <div className="text-center mt-2">
                <h5 className="text-primary">Seja bem-vindo!</h5>
                <p className="text-muted">Faça login para continuar.</p>
              </div>
              <div className="p-2 mt-4">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                              type={showPassword ? "text" : "password"}
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
                          onClick={toggleShowPassword}
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
                      disabled={connectingUser}
                    >
                      {connectingUser ? "Entrando..." : "Entrar"}
                    </Button>
                  </div>
                  <div className="text-end mt-1">
                    <Link to="/register">Cadastrar</Link>
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

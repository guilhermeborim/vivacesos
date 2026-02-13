import { ButtonPrimitive, InputController, Loading } from "@/core/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Label, Row } from "reactstrap";
import { useAuth } from "../hooks/use-auth";
import { registerFormSchema, RegisterFormTypeSchema } from "../schemas";

export default function Register() {
  const { register } = useAuth();
  const [registerUser, setRegisterUser] = React.useTransition();
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const form = useForm<RegisterFormTypeSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  function handleSubmit(payload: RegisterFormTypeSchema) {
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
                <h5 className="text-primary">Realize seu cadastro!</h5>
                <p className="text-muted">
                  Crie sua conta para acessar a plataforma.
                </p>
              </div>
              <div className="p-2 mt-4">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className="mb-3">
                    <InputController
                      control={form.control}
                      name="name"
                      label="Nome"
                      placeholder="Seu nome"
                      errors={form.formState.errors}
                    />
                  </div>
                  <div className="mb-3">
                    <InputController
                      control={form.control}
                      name="email"
                      label="Email"
                      placeholder="example@example.com"
                      errors={form.formState.errors}
                    />
                  </div>

                  <div className="mb-3">
                    <Label className="form-label" htmlFor="password-input">
                      Senha
                    </Label>
                    <div className="position-relative auth-pass-inputgroup mb-3">
                      <InputController
                        control={form.control}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        errors={form.formState.errors}
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
                    <ButtonPrimitive
                      variant="success"
                      className="w-100"
                      type="submit"
                      disabled={registerUser}
                      isLoading={registerUser}
                    >
                      Cadastrar
                    </ButtonPrimitive>
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

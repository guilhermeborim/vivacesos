import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonPrimitive } from "core/ui";
import { useAuth } from "features/auth/hooks/use-auth";
import {
  registerFormSchema,
  RegisterFormTypeSchema,
} from "features/auth/schemas";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Card, CardBody, Col, Label, Row } from "reactstrap";
import { InputController, Loading } from "shared/components";
import { useQueryInviteByToken } from "../api/mutations";

export default function Invite() {
  const [params] = useSearchParams();
  const { register } = useAuth();
  const [registerUser, setRegisterUser] = React.useTransition();
  const [showPassword, setShowPassword] = React.useState(false);
  const { data } = useQueryInviteByToken(params.get("token") as string);

  const form = useForm<RegisterFormTypeSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  useEffect(() => {
    if (data && data.data) {
      form.setValue("email", data.data.email);
    }
  }, [data]);
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

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
                <h5 className="text-primary">
                  Finalize o cadastro do convite!
                </h5>
                <p className="text-muted">
                  Crie sua conta para acessar a plataforma.
                </p>
              </div>
              <div className="p-2 mt-4">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className="mb-3">
                    <InputController
                      control={form.control}
                      name="email"
                      label="E-mail"
                      value={data?.data.email}
                      errors={form.formState.errors}
                      disabled
                    />
                  </div>
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
                      variant="primary"
                      className="w-100"
                      type="submit"
                      disabled={registerUser}
                      isLoading={registerUser}
                    >
                      Vamos lá
                    </ButtonPrimitive>
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
